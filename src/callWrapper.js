import axios from "axios";

//FIXME: Login Management

function toBase64(file, onSuccess, onError) {
       var reader = new FileReader();
       reader.onload = onSuccess;
       reader.onerror = onError;
       reader.readAsDataURL(file);
}

export function uploadData(file, name, onSuccess, onError) {
    toBase64(file, (content) => {
        const param = {
            datasource_name: name,
            data: content,
        };
        axios.post(`https://visquid.org/api/datasources`, {params: param})
            .then(onSuccess).catch(onError);
    }, onError);
}

export function getCharts(chartType, createdBefore, createdAfter, modifiedBefore, modifiedAfter, onSuccess, onError) {
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

    axios.get(`https://visquid.org/api/charts`, {params: param})
                .then(onSuccess).catch(onError);
}