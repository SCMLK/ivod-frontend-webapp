import React, { useState, useRef } from "react";
import MenuItem from '@material-ui/core/MenuItem';

const ChartUpload = () => {
  const [chart, setChart] = useState("");
  const inputFile = useRef(null);

  const handleFileUpload = e => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

      setChart(files[0]);
    }
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };


  console.log("chartobject", chart);
  const chartListItem = (chart.name !== undefined ? chart.name.slice(0, -5) : null);
  console.log("chartname: ", chartListItem);
  return (
    <div>
      <input
        style={{ display: "none" }}
        // accept=".zip,.rar"
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
      <MenuItem  onClick={onButtonClick}>
        neues Chart
      </MenuItem>
    </div>
  );
};

export default ChartUpload;
