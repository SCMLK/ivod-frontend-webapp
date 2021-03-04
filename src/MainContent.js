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
	const classes = useStyles();
    //TODO: Hardcoded values are an ugly fix, create state-object from a config?
    //selectStates[0] <=> open state
    //selectStates[1] <=> open setter
    //selectStates[2] <=> value state
    //selectStates[3] <=> value setter
    const selectStates = {
        'demo-controlled-time-open-select': React.useState(false).concat(React.useState('')),
        'demo-controlled-charttype-open-select': React.useState(false).concat(React.useState('')),
        'demo-controlled-filter-open-select': React.useState(false).concat(React.useState('')),
    }
    const [currentlyOpen, setCurrentlyOpen] = React.useState(undefined);

    const [chartList, setChartList] = React.useState([])

	const handleChange = (event) => {
      const setAge = selectStates[currentlyOpen][3];
	  setAge(event.target.value);
      updatePreviews();
	};

	const handleClose = (event) => {
      const setOpen = selectStates[currentlyOpen][1];
	  setOpen(false);
      setCurrentlyOpen(undefined)
	};

	const handleOpen = (event) => {
      setCurrentlyOpen(event.target.id);
      //Set all other managed selects to closed?
      const setOpen = selectStates[event.target.id][1];
	  setOpen(true);
	};

    const updatePreviews = () => {
        axios.get(`https://visquid.org/api/charts`)
          .then(res => {
            setChartList(res.data);
          });
    }

    React.useEffect( () => {
        console.log("State changed");
    })

    React.useEffect(() => {
        //Run only once on mount
        updatePreviews();
    }, []);

	return  (<div classs="mainContent">
            <Grid container spacing={3}>
              <Grid item xs>
                <FormControl className={classes.formControl} id="selectPopular">
			        <InputLabel id="demo-controlled-time-open-select-label">Charts der letzten 30 Tagen</InputLabel>
			        <Select
			          labelId="demo-controlled-time-open-select-label"
			          id="demo-controlled-time-open-select"
			          open={selectStates['demo-controlled-time-open-select'][0]}
			          onClose={handleClose}
			          onOpen={handleOpen}
			          value={selectStates['demo-controlled-time-open-select'][2]}
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
			          open={selectStates['demo-controlled-charttype-open-select'][0]}
			          onClose={handleClose}
			          onOpen={handleOpen}
			          value={selectStates['demo-controlled-charttype-open-select'][2]}
			          onChange={handleChange}
			        >
			          <MenuItem value="">
			            <em>None</em>
			          </MenuItem>
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
			          open={selectStates['demo-controlled-filter-open-select'][0]}
			          onClose={handleClose}
			          onOpen={handleOpen}
			          value={selectStates['demo-controlled-filter-open-select'][2]}
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
                { chartList.map( (object, index) => 
                    {
                        //FIXME: Simply pass the object and index to ChartPreview and let it handle the rest itself
                        return <ChartPreview pfp={PFPPlaceholder} preview={PreviewPlaceholder} chartDescription={object.chart_name} />
                    })
                }
            </Grid>
          </div>);
}
