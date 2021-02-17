import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './MainContent.css';

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
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

	const handleChange = (event) => {
	  setAge(event.target.value);
	};

	const handleClose = () => {
	  setOpen(false);
	};

	const handleOpen = () => {
	  setOpen(true);
	};

	return  (<div classs="mainContent">
            <Grid container spacing={3}>
              <Grid item xs>
                <FormControl className={classes.formControl} id="selectPopular">
			        <InputLabel id="demo-controlled-open-select-label">Charts der letzten 30 Tagen</InputLabel>
			        <Select
			          labelId="demo-controlled-open-select-label"
			          id="demo-controlled-open-select"
			          open={open}
			          onClose={handleClose}
			          onOpen={handleOpen}
			          value={age}
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
			        <InputLabel id="demo-controlled-open-select-label">alle Charts</InputLabel>
			        <Select
			          labelId="demo-controlled-open-select-label"
			          id="demo-controlled-open-select"
			          open={open}
			          onClose={handleClose}
			          onOpen={handleOpen}
			          value={age}
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
			        <InputLabel id="demo-controlled-open-select-label">Filter nach</InputLabel>
			        <Select
			          labelId="demo-controlled-open-select-label"
			          id="demo-controlled-open-select"
			          open={open}
			          onClose={handleClose}
			          onOpen={handleOpen}
			          value={age}
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
          </div>);
}
