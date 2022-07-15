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

  const generateData = (e) => {
    e.preventDefault();
    let generatedData = [];
    for (let i = 0; i < generatationAmount; i++) {
      generatedData.push(Math.floor(Math.random() * 100 + 1));
    }
    setData(generatedData);
  };

  // Generation Value
  // -------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------
  const [generatationAmount, setGenerationAmount] = useState(10);

  const changeGenerationAmount = (e) => {
    setGenerationAmount(e.target.value);
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
        <form onSubmit={generateData}>
          <input
            value={generatationAmount}
            type="number"
            onChange={changeGenerationAmount}
            required
          ></input>
          <button>Gen Data</button>
        </form>
      </div>
    </div>
  );
};

export default App;
