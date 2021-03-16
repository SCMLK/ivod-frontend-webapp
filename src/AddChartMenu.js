import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import ChartUpload from './ChartUpload';

const AddChartMenu = () => {
	
  const [anchorElChart, setAnchorElC] = React.useState(null);

  const handleAddChart = (event) => {
    console.log("AddChart clicked");
    setAnchorElC(event.currentTarget);
  };

  const handleCloseChart = () => {
    setAnchorElC(null);
  };

  const handleCloseNewChart = () => {
    setAnchorElC(null);
  };


  return (
	<div>
        <AddIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleAddChart} />
        <Menu id="simple-menu" anchorEl={anchorElChart} keepMounted open={Boolean(anchorElChart)} onClose={handleCloseChart}>
          <ChartUpload onClick={handleCloseNewChart} />                          
          <MenuItem onClick={handleCloseChart}>meine Charts</MenuItem>
          <MenuItem onClick={handleCloseChart}>Favoriten</MenuItem>
        </Menu>
    </div>
  );

};


export default AddChartMenu;
