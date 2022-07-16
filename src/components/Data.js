import React from "react";
import "../styles/Data.css";

const Data = (props) => {
  const removeData = (e) => {
    let updatedData = props.data.slice();
    updatedData.splice(e.target.dataset.idx, 1);
    props.setData(updatedData);
  };

  return (
    <div className="data">
      {props.data.map((value, index) => {
        return (
          <div
            className="data-point"
            style={{
              height: `${value}%`,
              width: `${100 / props.data.length}%`,
            }}
            onClick={removeData}
            data-val={value}
            data-idx={index}
          ></div>
        );
      })}
    </div>
  );
};

export default Data;
