import React, { useState, useEffect } from "react";
import "./styles/App.css";

const App = () => {
  // STATE: Array that needs to be sorted
  // -------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------
  const [data, setData] = useState([]);

  const addData = (value) => {
    let updatedData = data.slice();
    updatedData.push(value);
    setData(updatedData);
  };

  const removeData = (e) => {
    let updatedData = data.slice();
    updatedData.splice(e.target.dataset.idx, 1);
    setData(updatedData);
  };

  const isSorted = () => {
    let prev = data[0];
    for (const val of data) {
      if (val < prev) {
        return false;
      }
      prev = val;
    }
    return true;
  };

  const generateData = (amount) => {
    let updatedData = [];
    for (let i = 0; i < 10; i++) {
      const val = Math.floor(Math.random() * 100 + 1);
      updatedData.push(val);
    }
    setData(updatedData);
  };

  // RETURN
  // -------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <div className="header">
        <h1>Visualizing Sorter</h1>
        <ul className="sorting-list">
          <li>Bubble Sort</li>
          <li>Selection Sort</li>
          <li>Insertion Sort</li>
          <li>Quick Sort</li>
          <li>Merge Sort</li>
        </ul>
      </div>
      <div className="data">
        {data.map((value, index) => {
          return (
            <div
              className="data-point"
              style={{
                height: `${value}%`,
                width: `${100 / data.length}%`,
              }}
              onClick={removeData}
              data-val={value}
              data-idx={index}
            ></div>
          );
        })}
      </div>
      <div className="controls">
        <form>
          <input type="number" required></input>
          <button onClick={generateData}>Gen Data</button>
        </form>
      </div>
    </div>
  );
};

export default App;
