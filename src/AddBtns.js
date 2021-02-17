import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecAct from '@material-ui/core/ListItemSecondaryAction';
import AddIcon from '@material-ui/icons/Add';

function AddBtn() {
    return <ListItemSecAct>
                <IconButton edge="end" aria-label="add">
                    <AddIcon />
                </IconButton>
              </ListItemSecAct>;
}

export default AddBtn;