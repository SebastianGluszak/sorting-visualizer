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

  const [runningSteps, setRunningSteps] = useState(false);

  useEffect(() => {
    if (runningSteps) {
      return;
    }
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
    let updatedData = data.slice();
    let updatedDataSteps = [];
    doQuickSort(updatedData, 0, updatedData.length - 1);
    updatedDataSteps.push(updatedData);
    setDataSteps(updatedDataSteps);
  };

  const doQuickSort = (arr, low, high) => {
    if (low < high) {
      let partitionIdx = partition(arr, low, high);
      doQuickSort(arr, low, partitionIdx - 1);
      doQuickSort(arr, partitionIdx + 1, high);
    }
  };

  const partition = (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      if (arr[j] < pivot) {
        i++;
        swap(arr, i, j);
      }
    }

    swap(arr, i + 1, high);
    return i + 1;
  };

  const mergeSort = () => {
    setAlgoSelection("Merge Sort");
    let updatedData = data.slice();
    let updatedDataSteps = [];
    doMergeSort(updatedData, 0, updatedData.length - 1);
    updatedDataSteps.push(updatedData);
    setDataSteps(updatedDataSteps);
  };

  const doMergeSort = (arr, left, right) => {
    if (left >= right) {
      return;
    }
    let mid = left + parseInt((right - left) / 2);
    doMergeSort(arr, left, mid);
    doMergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  };

  const merge = (arr, left, mid, right) => {
    let n1 = mid - left + 1;
    let n2 = right - mid;

    let leftArray = Array(n1);
    let rightArray = Array(n2);

    for (let i = 0; i < n1; i++) {
      leftArray[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      rightArray[j] = arr[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = leftArray[i];
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = rightArray[j];
      j++;
      k++;
    }
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
        runningSteps={runningSteps}
        setRunningSteps={setRunningSteps}
        algoSelection={algoSelection}
      />
    </div>
  );
};

export default App;
