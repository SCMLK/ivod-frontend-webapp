import axios from "axios";

var currentClient = [];

//FIXME: Login Management
class Client {
    constructor(baseURL) {
        this.baseURL = baseURL; //FIXME: Sanitize input/remove trailing slash
        this.client = axios.create({
            baseURL: baseURL,
            timeout: 5000,
        });
        //this.user = null;
        this.accessToken = null;
        this.refreshToken = null;
    }

    login(username, password) {
        const param = {username: username, password: password};
        const client = this;
        this.client({method: "POST", url:`/api/token/`, data: param, headers:{"Content-Type": "application/json"}})
            .then((response) => {
                console.log(response)
                client.accessToken = response.data['access'];
                client.refreshToken = response.data['refresh'];
                //TODO: Start thread to auto-refresh
            }).catch(console.error);
    }

    uploadData(file, name, onSuccess, onError) {
        if(!(this.accessToken)) {
            throw "Not logged in!"
        }
        toBase64(file, (event) => {
            const param = {
                datasource_name: name,
                data: event.target.result.slice("data:application/json;base64,".length),
            };
            this.client({method: "POST", url:`/api/datasources`, data: param, headers:{"Content-Type": "application/json","Authorization":`Bearer ${this.accessToken}`}})
                .then(onSuccess).catch(onError);
        }, onError);
    }

    getCharts(chartType, createdBefore, createdAfter, modifiedBefore, modifiedAfter, onSuccess, onError) {
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

        this.client(config).then(onSuccess).catch(onError);
    }
}

function toBase64(file, onSuccess, onError) {
       var reader = new FileReader();
       reader.onload = onSuccess;
       reader.onerror = onError;
       reader.readAsDataURL(file);
}

export function getClient(name="default") {
    return currentClient[name];
}

export function createClient(baseURL, name="default") {
    currentClient[name] = new Client(baseURL);
    return currentClient[name];
}