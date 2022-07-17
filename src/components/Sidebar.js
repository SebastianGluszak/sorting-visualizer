import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";

const Sidebar = (props) => {
  const [min, setMin] = useState(0);

  useEffect(() => {
    let min = 101;
    for (let val of props.data) {
      if (min > val) {
        min = val;
      }
    }
    setMin(min);
  }, [props.data]);

  const [max, setMax] = useState(0);

  useEffect(() => {
    let max = -1;
    for (let val of props.data) {
      if (max < val) {
        max = val;
      }
    }
    setMax(max);
  }, [props.data]);

  const [avg, setAvg] = useState(0);

  useEffect(() => {
    let avg = 0;
    for (let val of props.data) {
      avg += val;
    }
    avg = Math.round(avg / props.data.length);
    setAvg(avg);
  }, [props.data]);

  return (
    <div className="sidebar">
      <h4>Algorithm: {props.algorithm}</h4>
      <h4>Data Length: {props.data.length}</h4>
      <h4>Data Min: {min}</h4>
      <h4>Data Max: {max}</h4>
      <h4>Data Avg: {avg}</h4>
    </div>
  );
};

export default Sidebar;
