import React, { useState, useEffect } from "react";
import shuffle from "lodash/shuffle";
import "./styles/App.css";

const App = () => {
  // STATE: Array that needs to be sorted
  // -------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------
  const [data, setData] = useState([50, 60, 70, 40, 20, 30, 50, 20, 10, 30]);

  const [dataSteps, setDataSteps] = useState([
    [50, 60, 70, 40, 20, 30, 50, 20, 10, 30],
  ]);

  // Sorting algorithms
  // -------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------
  const runSteps = async () => {
    for (let step of dataSteps) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(setData(step));
        }, 1000);
      });
    }
  };

  const bubbleSort = () => {
    let updatedData = data.slice();
    let updatedDataSteps = dataSteps.slice();
    for (let i = 0; i < data.length - 1; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (updatedData[j] > updatedData[j + 1]) {
          swap(updatedData, j, j + 1);
          const step = updatedData.slice();
          updatedDataSteps.push(step);
        }
      }
    }
    setDataSteps(updatedDataSteps);
  };

  const swap = (arr, prev, curr) => {
    const temp = arr[prev];
    arr[prev] = arr[curr];
    arr[curr] = temp;
  };

  // Helper functions
  // -------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------

  const addData = (e) => {
    e.preventDefault();
    let updatedData = data.slice();
    updatedData.push(addValue);
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

  const shuffleData = () => {
    let shuffledData = shuffle(data.slice());
    setData(shuffledData);
  };

  // STATE: Generation Value
  // -------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------
  const [generatationAmount, setGenerationAmount] = useState("");

  const changeGenerationAmount = (e) => {
    setGenerationAmount(e.target.value);
  };

  // STATE: Add Value
  // -------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------
  const [addValue, setAddValue] = useState("");

  const changeAddValue = (e) => {
    setAddValue(e.target.value);
  };

  // RETURN
  // -------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <div className="header">
        <h1>Visualizing Sorter</h1>
        <ul className="sorting-list">
          <li onClick={bubbleSort}>Bubble Sort</li>
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
            placeholder="1-100"
            min="1"
            max="100"
          ></input>
          <button>Randomize Data</button>
        </form>
        <form onSubmit={addData}>
          <input
            value={addValue}
            type="number"
            onChange={changeAddValue}
            required
            placeholder="1-100"
            min="1"
            max="100"
          ></input>
          <button>Add Value</button>
        </form>
        <button onClick={shuffleData}>Shuffle Data</button>
        <button onClick={runSteps}>Run Steps</button>
      </div>
    </div>
  );
};

export default App;
