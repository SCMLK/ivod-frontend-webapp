import React from 'react';
import {getClient } from './callWrapper'

export default function Upload() {

    const onChangeHandler = (event) => {
        //Do Upload here
        getClient().uploadData(event.target.files[0], 'HARDCODED_NAME', console.log, errorHandler);
    }

    const errorHandler = (error) => {
        console.log(error)
    }

    return (<form>
         <input type="file" name="file" onChange={onChangeHandler}/>
    </form>);
}