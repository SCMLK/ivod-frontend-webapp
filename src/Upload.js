import React from 'react';
import {uploadData} from './callWrapper'

export default function Upload() {

    const onChangeHandler = (event) => {
        //Do Upload here
        uploadData(event.target.files[0], 'HARDCODED_NAME', console.log, console.error);
    }

    return (<form>
         <input type="file" name="file" onChange={onChangeHandler}/>
    </form>);
}