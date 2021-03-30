import axios from "axios";

const currentClient = {};

class Client {
    constructor(baseURL, name) {
        this.client = axios.create({
            baseURL: baseURL,
            timeout: 5000,
        });
        this.accessToken = null;
        this.refreshToken = null;
        this.name = name;
    }

    login(username, password) {
        const param = {username: username, password: password};
        const client = this;
        return this.client({method: "POST", url:`/api/token/`, data: param, headers:{"Content-Type": "application/json"}})
            .then((response) => {
                console.log(response)
                client.accessToken = response.data['access'];
                client.refreshToken = response.data['refresh'];
                currentClient[client.name] = client;
                //TODO: Start thread to auto-refresh
            }).catch(console.error);
    }

    logout() {
        this.accessToken = null;
        this.refreshToken = null;
        currentClient[this.name] = this;
    }

    async createDatasourceFromFile(file, name, onSuccess, onError) {
        await this.assertLogin()
        toBase64(file, (event) => {
            const param = {
                datasource_name: name,
                data: event.target.result.slice("data:application/json;base64,".length),
            };
            this.client({method: "POST", url:`/api/datasources`, data: param, headers:{"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}})
                .then(onSuccess).catch(onError);
        }, onError);
    }

    async createDatasourceFromURL(url, name) {
        await this.assertLogin()
        const param = {
            datasource_name: name,
            url: url,
        };
        const response = await this.client({method: "POST", url:`/api/datasources`, data: param, headers:{"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}})
        return response.data;
    }

    async getDatasources() {
        const config = {method: "GET", url:`/api/datasources`}
        if(this.accessToken) {
            config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        }
        const response = await this.client(config);
        return response.data;
    }

    async getDatasource(datasourceID) {
        const config = {method: "GET", url:`/api/datasources/${datasourceID}`}
        if(this.accessToken) {
            config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        }
        const response = await this.client(config);
        return response.data;
    }

    async updateDatasource(datasourceID, name) {
        await this.assertLogin();
        const param = {
            datasource_name: name,
        };
        const response = await this.client({method: "PATCH", url:`/api/datasources/${datasourceID}`, data: param, headers:{"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}})
        return response.data;
    }

    async deleteDatasource(datasourceID) {
        await this.assertLogin();
        const response = await this.client({method: "DELETE", url:`/api/datasources/${datasourceID}`, headers:{"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}})
        return response.data;
    }

    async getChartTypes(datasourceID) {
        const config = {method: "GET", url:`/api/datasources/${datasourceID}/charttypes`}
        if(this.accessToken) {
            config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        }
        const response = await this.client(config);
        return response.data;
    }

    async getCharts(chartType, createdBefore, createdAfter, modifiedBefore, modifiedAfter) {
        const param =  {}
        if(chartType) {
            param['chart_type'] = chartType;
        }
        if(createdBefore) {
            param['creation_time__lte'] = createdBefore;
        }
        if(createdAfter) {
            param['creation_time__gte'] = createdBefore;
        }
        if(modifiedBefore) {
            param['modification_time__lte'] = createdBefore;
        }
        if(modifiedAfter) {
            param['modification_time__gte'] = createdBefore;
        }
        const config = {method: "GET", url:`/api/charts`, params: param}
        if(this.accessToken) {
            config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        }

        const response = await this.client(config);
        return response.data;
    }

    async createChart(datasourceID, chartType, chartConfig, name, downloadable=false, visibility=0) {
        await this.assertLogin();
        const data = {datasource:datasourceID,chart_type:chartType, config:chartConfig, chart_name:name, downloadable:downloadable, visibility:visibility}
        const config = {method: "POST", url:`/api/charts`, data: data}
        config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        const response = await this.client(config);
        return response.data;
    }

    async getChart(chartID) {
        const config = {method: "GET", url:`/api/charts/${chartID}`}
        if(this.accessToken) {
            config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        }
        const response = await this.client(config);
        return response.data;
    }

    async modifyChart(chartID, modifications= {}) {
        await this.assertLogin();
        const config = {method: "PATCH", url:`/api/charts/${chartID}`, data: modifications}
        config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        const response = await this.client(config);
        return response.data;
    }

    async deleteChart(chartID) {
        await this.assertLogin();
        const config = {method: "DELETE", url:`/api/charts/${chartID}`}
        config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        const response = await this.client(config);
        return response.data;
    }

    async getChartCodeURL(chartID) {
        const config = {method: "HEAD", url:`/api/charts/${chartID}/code`,maxRedirects:0}
        if(this.accessToken) {
            config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        }
        const response = await this.client(config);
        return response.request.responseURL
    }

    async getChartCode(chartID) {
        const config = {method: "GET", url:`/api/charts/${chartID}/code`}
        if(this.accessToken) {
            config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        }
        const response = await this.client(config);
        return response.data;
    }

    async getChartConfig(chartID) {
        const config = {method: "GET", url:`/api/charts/${chartID}/code`}
        if(this.accessToken) {
            config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        }
        const response = await this.client(config);
        return response.data;
    }

    async getChartFile(chartID, filename) {
        const config = {method: "GET", url:`/api/charts/${chartID}/files/${filename}`}
        if(this.accessToken) {
            config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        }
        const response = await this.client(config);
        return response.data;
    }

    async getShares(type, id) {
        const config = {method: "GET", url:`/api/${type}/${id}/shared`}
        if(this.accessToken) {
            config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}
        }
        const response = await this.client(config);
        return response.data;
    }

    getChartShares(chartID) {
        return this.getShares('charts',chartID);
    }

    getDatasourceShares(datasourceID) {
        return this.getShares('datasources',datasourceID);
    }

    async modifyShare(type,method, id, users, groups) {
        await this.assertLogin();
        const data = {
            users: users,
            groups: groups,
        };
        const config = {method: method, url:`/api/${type}/${id}/shared`, data:data};
        if(this.accessToken) {
            config['headers'] = {"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`};
        }
        const response = await this.client(config);
        return response.data;
    }

    removeChartShare(id, users, groups) {
        return this.modifyShare('charts','DELETE', id, users, groups);
    }

    addChartShare(id, users, groups) {
        return this.modifyShare('charts','PATCH', id, users, groups);
    }

    removeDatasourceShare(id, users, groups) {
        return this.modifyShare('datasources','DELETE', id, users, groups);
    }

    addDatasourceShare(id, users, groups) {
        return this.modifyShare('datasources','PATCH', id, users, groups);
    }

    refreshAccessToken() {
        if(!this.refreshToken) {
            throw "Not logged in!";
        }

        const payload = parseJwt(this.refreshToken);
        if(Date.now()/1000 > payload['exp']) {
            this.logout();
            throw "Refresh token expired";
        }

        const client = this.client;
        const data = {refresh: this.refreshToken}
        return this.client({method: "POST", url:`/api/token/refresh/`, data: data, headers:{"Content-Type": "application/json"}})
            .then((response) => {
                console.log(response)
                client.accessToken = response.data['access'];
            }).catch(console.error);
    }

    async assertLogin() {
        //FIXME: Check if token is still valid
        if(!(this.accessToken)) {
            throw "Not logged in!";
        }
        const payload = parseJwt(this.accessToken);
        if(Date.now()/1000 > payload['exp']) {
            await this.refreshAccessToken();
        }
    }

    async verifyToken(token) {
        try {
            await this.client({
                method: "POST",
                url: `/api/token/verify/`,
                data: {token: token},
                headers: {"Content-Type": "application/json"}
            })
            return true;
        } catch {
            return false;
        }

    }
}

function toBase64(file, onSuccess, onError) {
       var reader = new FileReader();
       reader.onload = onSuccess;
       reader.onerror = onError;
       reader.readAsDataURL(file);
}

function parseJwt(token) {
  var base64Payload = token.split('.')[1];
  var payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
}

export function getClient(name="default") {
    return currentClient[name];
}

export function createClient(baseURL, name="default") {
    currentClient[name] = new Client(baseURL, name);
    return currentClient[name];
}