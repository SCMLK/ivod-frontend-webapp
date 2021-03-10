import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';

const AddGroupsMenu = () => {
	
  const [anchorElGroups, setAnchorElG] = React.useState(null);

  const handleAddGroups = (event) => {
    console.log("AddGroups clicked");
    setAnchorElG(event.currentTarget);
  };

  const handleCloseGroup = () => {
    setAnchorElG(null);
  };

  return (
  	<div>
      <AddIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleAddGroups} />
      <Menu id="simple-menu" anchorEl={anchorElGroups} keepMounted open={Boolean(anchorElGroups)} onClose={handleCloseGroup}>
        <MenuItem onClick={handleCloseGroup}>neue Gruppe</MenuItem>

      </Menu>
    </div>
  );

};


export default AddGroupsMenu;
