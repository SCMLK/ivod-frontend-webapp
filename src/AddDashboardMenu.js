import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';

const AddDashboardMenu = () => {
	
  const [anchorElDashboard, setAnchorElD] = React.useState(null);

  const handleAddDashboard = (event) => {
    console.log("AddDashboard clicked");
    setAnchorElD(event.currentTarget);
  };

  const handleCloseDashboard = () => {
    setAnchorElD(null);
  };

  return (
  	<div>
      <AddIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleAddDashboard} />
      <Menu id="simple-menu" anchorEl={anchorElDashboard} keepMounted open={Boolean(anchorElDashboard)} onClose={handleCloseDashboard}>
        <MenuItem onClick={handleCloseDashboard}>neues Dashboard</MenuItem>
      </Menu>
    </div>
  );

};


export default AddDashboardMenu;
