import React from 'react';

import {createClient, getClient} from "./callWrapper";

export default function ChartRender(props) {

    const [libraryURL, setLibraryURL] = React.useState('');
    const [missingLibraries, setMissingLibraries] = React.useState(null);
    const [config, setConfig] = React.useState(null);
    const [waitingInterval, setWaitingInterval] = React.useState(null);
    const [chartObject, setchartObject] = React.useState(null);

    function buildHeader(){
        const token=getClient().accessToken;
        if(token){
            return {headers:{"Authorization": "Bearer "+token}}
        }
    }


    const loadScriptTags = () => {

        const requiredScripts = libraryURL;
        const head = document.getElementsByTagName('head')[0];
        const loadedScripts = head.querySelectorAll('script');

        //Filter out already loaded scripts
        for (const script of loadedScripts) {
            let index = requiredScripts.indexOf(script.src);
            if(index !== -1) {
                requiredScripts.splice(index);
            }
        }
        setMissingLibraries(requiredScripts)
    }

    const addScriptTags = () => {
        //Add missing scripts
        const loadOrder = missingLibraries;
        if(loadOrder.length > 0) {
            const head = document.getElementsByTagName('head')[0];
            const scriptURL = loadOrder.shift()
            const scriptTag = document.createElement('script');
            scriptTag.src = scriptURL;
            console.log(`Loaded library ${scriptURL}`)
            head.appendChild(scriptTag)
            setMissingLibraries(loadOrder.slice())
        }
    }

    React.useEffect( () => {
        console.log("State changed");
        if(!libraryURL) {
            const client = getClient();
            getClient().getChartCodeURL(props.chartID).then((result)=>{setLibraryURL([`${client.baseURL}/api/code/base.js`,result]);});
        } else if(missingLibraries == null) {
            loadScriptTags();
        } else if(missingLibraries.length > 0) {
            addScriptTags();
        } else if(!config) {
            const configURL = getClient().getChartConfigURL(props.chartID);
            window.d3.json(configURL, buildHeader())
                    .then((config) => {
                        setConfig(config)
                    });
        } else if(!chartObject && !waitingInterval) {
            const interval = setInterval(() => {
                console.log(chartObject)
                if(!(window.pive == undefined || window.pive[config.js_name.toLowerCase()] == undefined)) {
                    //FIXME: Will never be executed if wrong library is loaded, can this be exploited for DoS?
                    //Dependencies loaded, render chartObject
                    clearInterval(interval)
                    let chart = new window.pive[config.js_name.toLowerCase()][config.version](config, buildHeader());
                    setchartObject(chart);
                    setWaitingInterval(null)
                }
            },500)
            setWaitingInterval(interval);
        } else if(chartObject){
            console.log("drawing chart")
            chartObject.render();
        }
    })

    React.useEffect(() => {
        //Run only once on mount
    }, []);

    return (<div id={'chart'}>
    </div>);
}