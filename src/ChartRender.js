import React from 'react';

import {createClient, getClient} from "./callWrapper";

export default function ChartRender(props) {

    const [libraryURL, setLibraryURL] = React.useState('');
    const [missingLibraries, setMissingLibraries] = React.useState(null);
    const [chartObject, setchartObject] = React.useState(null);

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
        } else if(missingLibraries.length > 0){
            addScriptTags();
        } else if(!chartObject) {
            //Dependencies loaded, render chartObject
            getClient().getChartFile(props.chartID, 'site.html').then((code) => {
                const target_div = document.getElementById('chart');
                const scriptTag = document.createElement('script');
                function buildHeader(){const token=getClient().accessToken;if(token){return {headers:{"Authorization": "Bearer "+token}}}};
                const configURL = getClient().getChartConfigURL(props.chartID);
                window.d3.json(configURL, buildHeader())
                    .then((config)=>{
                        console.log(config)
                        let chart = new window.pive[config.js_name.toLowerCase()][config.version](config, buildHeader());
                        setchartObject(chart)})
                //const evaledScript = `function callback(chart){setchartObject(chart)};function buildHeader(){const token="${getClient().accessToken}";if(token){return {headers:{"Authorization": "Bearer "+token}}}};${code}`; //FIXME: There must be a better way
                // scriptTag.innerHTML = evaledScript;
                // target_div.appendChild(scriptTag)
            });
        } else {
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