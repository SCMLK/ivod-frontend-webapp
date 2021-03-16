import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './MainContent.css';
import ChartPreview from './ChartPreview'

import PFPPlaceholder from './images/pfp_placeholder.png'
import PreviewPlaceholder from './images/preview_placeholder.png'

import axios from 'axios';
import deepEqual from 'deep-equal'


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function MainContent() {

    const [committedState, setstate] =  React.useState({
        dropdown : {
            'demo-controlled-time-open-select': {
                open: false,
                value: "",
            },
            'demo-controlled-charttype-open-select': {
                open: false,
                value: 10,
            }
            ,
            'demo-controlled-filter-open-select': {
                open: false,
                value: 10,
            }
        },
        last_opened: "",
        charts: [],
        previous: {},
    });
    const uncommittedState = JSON.parse(JSON.stringify(committedState));
    const commitState = () => {
        setstate(uncommittedState);
    };

    // const getOpen = () => {
    //     //Return the first open dropdown list, or null, if no lists are open
    //     for (let [name, list] of Object.entries(uncommittedState.dropdown)) {
    //         if (list.open) {
    //             return list;
    //         }
    //     }
    //     return null;
    // }

    const valuesChanged = () => {
        for (let [name, list] of Object.entries(uncommittedState.dropdown)) {
            if ( !(
                uncommittedState.previous &&
                uncommittedState.previous.dropdown &&
                uncommittedState.previous.dropdown[name] &&
                uncommittedState.previous.dropdown[name].value === list.value)) {
                return true;
            }
        }
        return false;
    }

	const classes = useStyles();

	const handleChange = (event) => {
      let list = uncommittedState.dropdown[uncommittedState.last_opened];
	  list.value = event.target.value;
	  commitState()
	};

	const handleClose = (event) => {
        let list = uncommittedState.dropdown[uncommittedState.last_opened]
        list.open = false;
        commitState()
	};

	const handleOpen = (event) => {
	  uncommittedState.last_opened = event.target.id;
	  uncommittedState.dropdown[uncommittedState.last_opened]['open'] = true;
	  commitState()
	};

    const updatePreviews = () => {
        if (valuesChanged()) {
            // Update the reference value, so valuesChanged returns false next time
            const cloned_state = JSON.parse(JSON.stringify(uncommittedState));
            delete cloned_state.previous;
            uncommittedState.previous = cloned_state;

            const param = {}
            if (uncommittedState.dropdown['demo-controlled-time-open-select']['value'] === 10) {
                let date = new Date();
                date.setDate(date.getDate() - 7);
                param['creation_time__gte'] = date.toISOString()
            }
            if (uncommittedState.dropdown['demo-controlled-time-open-select']['value'] === 20) {
                let date = new Date();
                date.setDate(date.getDate() - 30);
                param['creation_time__gte'] = date.toISOString()
            }
            switch (uncommittedState.dropdown['demo-controlled-charttype-open-select']['value']) {
                case 20:
                    param['chart_type'] = 'piechart';
                    break;
                case 30:
                    param['chart_type'] = 'linechart';
                    break;
                case 40:
                    param['chart_type'] = 'chordchart';
                    break;
                case 50:
                    param['chart_type'] = 'bubblechart';
                    break;
                case 60:
                    param['chart_type'] = 'scatterchart';
                    break;
                case 70:
                    param['chart_type'] = 'hiveplot';
                    break;
            }
            axios.get(`https://visquid.org/api/charts`, {params: param})
                .then(res => {
                    console.log("Checked for charts")
                    if (!(deepEqual(res.data, uncommittedState.charts))) {

                        //Only run if local data differed from most recent server response
                        uncommittedState.charts = res.data;
                        console.log("Found changes in charts, updating!")
                        commitState();
                    }
                });
        }
    }

    React.useEffect( () => {
        console.log("State changed");
        updatePreviews();
    })

    React.useEffect(() => {
        //Run only once on mount
        
    }, []);

	return  (<div classs="mainContent">
            <Grid container spacing={3}>
              <Grid item xs>
                <FormControl className={classes.formControl} id="selectPopular">
			        <InputLabel id="demo-controlled-time-open-select-label">Charts der letzten 30 Tagen</InputLabel>
			        <Select
			          labelId="demo-controlled-time-open-select-label"
			          id="demo-controlled-time-open-select"
			          open={uncommittedState.dropdown['demo-controlled-time-open-select']['open']}
			          onClose={handleClose}
			          onOpen={handleOpen}
			          value={uncommittedState.dropdown['demo-controlled-time-open-select']['value']}
			          onChange={handleChange}
			        >
			          <MenuItem value="">
			            <em>None</em>
			          </MenuItem>
			          <MenuItem value={10}>Charts der letzten 7 Tagen</MenuItem>
			          <MenuItem value={20}>Charts der letzten 30 Tagen</MenuItem>
			          <MenuItem value={30}>populärste Charts</MenuItem>
			          <MenuItem value={40}>neusten Charts</MenuItem>
			          <MenuItem value={50}>meist erstellten Charts</MenuItem>
			        </Select>
			    </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.formControl} id="selectCharts">
			        <InputLabel id="demo-controlled-charttype-open-select-label">alle Charts</InputLabel>
			        <Select
			          labelId="demo-controlled-charttype-open-select-label"
			          id="demo-controlled-charttype-open-select"
			          open={uncommittedState.dropdown['demo-controlled-charttype-open-select']['open']}
			          onClose={handleClose}
			          onOpen={handleOpen}
			          value={uncommittedState.dropdown['demo-controlled-charttype-open-select']['value']}
			          onChange={handleChange}
			        >
			          <MenuItem value={10}>alle Charts</MenuItem>
			          <MenuItem value={20}>Piecharts</MenuItem>
			          <MenuItem value={30}>Linecharts</MenuItem>
			          <MenuItem value={40}>Chordcharts</MenuItem>
			          <MenuItem value={50}>Bubblecharts</MenuItem>
			          <MenuItem value={60}>Scattercharts</MenuItem>
			          <MenuItem value={70}>Hiveplots</MenuItem>
			        </Select>
			    </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.formControl} id="selectFilter">
			        <InputLabel id="demo-controlled-filter-open-select-label">Filter nach</InputLabel>
			        <Select
			          labelId="demo-controlled-filter-open-select-label"
			          id="demo-controlled-filter-open-select"
			          open={uncommittedState.dropdown['demo-controlled-filter-open-select']['open']}
			          onClose={handleClose}
			          onOpen={handleOpen}
			          value={uncommittedState.dropdown['demo-controlled-filter-open-select']['value']}
			          onChange={handleChange}
			        >
			          <MenuItem value="">
			            <em>None</em>
			          </MenuItem>
			          <MenuItem value={10}>Nutzer</MenuItem>
			          <MenuItem value={20}>Gruppen</MenuItem>
			          <MenuItem value={30}>Collections</MenuItem>
			          <MenuItem value={40}>Dashboards</MenuItem>
			        </Select>
			    </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
                { uncommittedState.charts.map( (object, index) =>
                    {
                        //FIXME: Simply pass the object and index to ChartPreview and let it handle the rest itself
                        return <ChartPreview pfp={PFPPlaceholder} preview={PreviewPlaceholder} chartDescription={object.chart_name} />
                    })
                }
            </Grid>
          </div>);
}
