import React from "react";
import "../styles/Header.css";

const Header = (props) => {
  return (
    <div className="header">
      <h1>Visualizing Sorter</h1>
      <ul className="sorting-list">
        <li onClick={props.bubbleSort}>Bubble Sort</li>
        <li onClick={props.selectionSort}>Selection Sort</li>
        <li onClick={props.insertionSort}>Insertion Sort</li>
        <li onClick={props.quickSort}>Quick Sort</li>
        <li onClick={props.mergeSort}>Merge Sort</li>
      </ul>
    </div>
  );
};

export default Header;
