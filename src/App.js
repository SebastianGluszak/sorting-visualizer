import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Data from "./components/Data";
import Controls from "./components/Controls";
import "./styles/App.css";

const App = () => {
  const [algoSelection, setAlgoSelection] = useState("");

  const [data, setData] = useState([50, 60, 70, 40, 20, 30, 50, 20, 10, 30]);

  const [dataSteps, setDataSteps] = useState([
    [50, 60, 70, 40, 20, 30, 50, 20, 10, 30],
  ]);

  useEffect(() => {
    if (algoSelection === "Bubble Sort") {
      bubbleSort();
    } else if (algoSelection === "Selection Sort") {
      selectionSort();
    } else if (algoSelection === "Insertion Sort") {
      insertionSort();
    } else if (algoSelection === "Quick Sort") {
      quickSort();
    } else if (algoSelection === "Merge Sort") {
      mergeSort();
    }
  }, [data]);

  const bubbleSort = () => {
    setAlgoSelection("Bubble Sort");
    let updatedData = data.slice();
    let updatedDataSteps = [];
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

  const selectionSort = () => {
    setAlgoSelection("Selection Sort");
    let updatedData = data.slice();
    let updatedDataSteps = [];
    for (let i = 0; i < data.length; i++) {
      let min = i;
      for (let j = i; j < data.length; j++) {
        if (updatedData[j] < updatedData[min]) {
          min = j;
        }
      }
      swap(updatedData, i, min);
      const step = updatedData.slice();
      updatedDataSteps.push(step);
    }
    setDataSteps(updatedDataSteps);
  };

  const insertionSort = () => {
    setAlgoSelection("Insertion Sort");
    let updatedData = data.slice();
    let updatedDataSteps = [];
    for (let i = 0; i < data.length; i++) {
      let key = updatedData[i];
      let j = i - 1;
      while (j >= 0 && updatedData[j] > key) {
        updatedData[j + 1] = updatedData[j];
        j--;
        const step = updatedData.slice();
        updatedDataSteps.push(step);
      }
      updatedData[j + 1] = key;
      const step = updatedData.slice();
      updatedDataSteps.push(step);
    }
    setDataSteps(updatedDataSteps);
  };

  const quickSort = () => {
    setAlgoSelection("Quick Sort");
  };

  const mergeSort = () => {
    setAlgoSelection("Merge Sort");
  };

  const swap = (arr, prev, curr) => {
    const temp = arr[prev];
    arr[prev] = arr[curr];
    arr[curr] = temp;
  };

  return (
    <div className="app">
      <Header
        bubbleSort={bubbleSort}
        insertionSort={insertionSort}
        selectionSort={selectionSort}
        quickSort={quickSort}
        mergeSort={mergeSort}
      />

      <Sidebar algorithm={algoSelection} data={data} />

      <Data data={data} setData={setData} />

      <Controls
        data={data}
        dataSteps={dataSteps}
        setData={setData}
        setDataSteps={setDataSteps}
      />
    </div>
  );
};

export default App;
