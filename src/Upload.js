import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {createClient, getClient} from './callWrapper'
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {Input} from "@material-ui/core";

export default function Upload() {

    const [committedState, setstate] = React.useState({
        dropdown: {
            'upload-datasource-select': {
                open: false,
                value: "",
            },
            'upload-charttype-select': {
                open: false,
                value: "",
            },
        },
        selectedDatasource: undefined,
        last_opened: undefined,
        availableDatasources: [],
        available_chart_types: [],
    });
    const [chartName, setChartName] = React.useState("");

    const uncommittedState = JSON.parse(JSON.stringify(committedState));
    const commitState = () => {
        setstate(uncommittedState);
    };

    const onChangeHandler = (event) => {
        //Do Upload here
        getClient().createDatasourceFromFile(event.target.files[0], `HARDCODED_NAME_${new Date().toISOString()}`, console.log, errorHandler)
            .then( () => { updateAvailableDatasources();});
    };

    const errorHandler = (error) => {
        console.log(error)
    };

    const handleChangeDatasource = (event) => {
        let list = uncommittedState.dropdown['upload-datasource-select'];
	    list.value = event.target.value;
	    uncommittedState.selectedDatasource = uncommittedState.availableDatasources[event.target.value];
    };

    const handleChangeCharttype = (event) => {
        let list = uncommittedState.dropdown['upload-charttype-select'];
	    list.value = event.target.value;
	    uncommittedState.selectedDatasource = uncommittedState.availableDatasources[event.target.value];
    };

    const handleOpen = (event) => {
        uncommittedState.last_opened = event.target.id;
	    uncommittedState.dropdown[uncommittedState.last_opened]['open'] = true;
	    commitState();
    };

    const handleClose = (event) => {
        let list = uncommittedState.dropdown[uncommittedState.last_opened]
        list.open = false;
        commitState();
    };

    const updateCharttypes = () => {
        if(uncommittedState.selectedDatasource) {
            getClient().getChartTypes(uncommittedState.selectedDatasource.id).then( (chartTypes) => {
                console.log(chartTypes);
                uncommittedState.available_chart_types = chartTypes;
                uncommittedState.dropdown["upload-charttype-select"].value = chartTypes[0];
                commitState();
            }).catch( () => {
                uncommittedState.available_chart_types = [];
                commitState();
            });
        }
    }

    const updateAvailableDatasources = () => {
        if(getClient()) {
            getClient().getDatasources().then((datasources) => {
                uncommittedState.availableDatasources = datasources;
                uncommittedState.selectedDatasource = datasources[0]
                uncommittedState.dropdown["upload-datasource-select"].value = 0;
                updateCharttypes();
            }).catch(() => {
                uncommittedState.availableDatasources = [];
                commitState();
            });
        }
    }

    const createChart= () => {
        getClient().createChart(uncommittedState.selectedDatasource.id, uncommittedState.dropdown["upload-charttype-select"].value, "{}", chartName, false, 4)
            .then( (chart) => {
                alert("CHART ERZEUGT!");
                console.log(chart);
            })
            .catch( (error) => {alert(error);})
    } ;

    React.useEffect( () => {
    })

    React.useEffect(() => {
        updateAvailableDatasources();
    }, []);

    return (<div>
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <form>
                    <input type="file" name="file" onChange={onChangeHandler}/>
                </form>
            </Grid>
            <Grid item xs={4}>
                <FormControl id="datasourceSelection">
			        <InputLabel id="upload-datasource-select-label">Verfügbare Datenquellen</InputLabel>
			        <Select
			          labelId="upload-datasource-select"
			          id="upload-datasource-select"
			          open={uncommittedState.dropdown['upload-datasource-select']['open']}
			          onClose={handleClose}
			          onOpen={handleOpen}
			          value={uncommittedState.dropdown['upload-datasource-select']['value']}
			          onChange={handleChangeDatasource}
			        >
                        { uncommittedState.availableDatasources.map( (object, index) =>
                            {
                                return (<MenuItem value={index}> {object.datasource_name} </MenuItem>)
                            })
                        }
			        </Select>
			    </FormControl>
            </Grid>
            <Grid item xs={4}>
                <Button onClick={() => { updateAvailableDatasources() }}>
                    Aktualisiere Datenquellen
                </Button>
            </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <FormControl id="chartCreation">
			        <InputLabel id="upload-charttype-select-label">Mögliche Charttypen</InputLabel>
			        <Select
			          labelId="upload-charttype-select-label"
			          id="upload-charttype-select"
			          open={uncommittedState.dropdown['upload-charttype-select']['open']}
			          onClose={handleClose}
			          onOpen={handleOpen}
			          value={uncommittedState.dropdown['upload-charttype-select']['value']}
			          onChange={handleChangeCharttype}
			        >
                        { uncommittedState.available_chart_types.map( (object, index) =>
                            {
                                return (<MenuItem value={object}> {object} </MenuItem>)
                            })
                        }
			        </Select>
			    </FormControl>
            </Grid>
            <Grid item xs={4}>
                <Input id='upload-chart-name-button' type={'text'} name={'chartname'} value={chartName} onChange={ (event) => {setChartName(event.target.value)}}/>;
            </Grid>
            <Grid item xs={4}>
                <Button onClick={() => { createChart() }}>
                    Erzeuge neue Chart
                </Button>
            </Grid>
        </Grid>
    </div>);
}