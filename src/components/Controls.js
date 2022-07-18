import React, { useState } from "react";
import shuffle from "lodash/shuffle";
import "../styles/Controls.css";

const Controls = (props) => {
  const [generatationAmount, setGenerationAmount] = useState("");

  const changeGenerationAmount = (e) => {
    setGenerationAmount(e.target.value);
  };

  const generateData = (e) => {
    e.preventDefault();
    if (props.runningSteps) {
      return;
    }
    props.setDataSteps([]);
    let generatedData = [];
    for (let i = 0; i < generatationAmount; i++) {
      generatedData.push(Math.floor(Math.random() * 100 + 1));
    }
    props.setData(generatedData);
  };

  const [addValue, setAddValue] = useState("");

  const changeAddValue = (e) => {
    setAddValue(e.target.value);
  };

  const addData = (e) => {
    e.preventDefault();
    if (props.runningSteps) {
      return;
    }
    if (props.data.length === 100) {
      return;
    }
    let updatedData = props.data.slice();
    updatedData.push(parseInt(addValue));
    props.setData(updatedData);
  };

  const shuffleData = () => {
    if (props.runningSteps) {
      return;
    }
    let shuffledData = shuffle(props.data.slice());
    props.setData(shuffledData);
  };

  const runSteps = async () => {
    if (props.algoSelection === "") {
      alert("Select an algorithm");
      return;
    }
    props.setRunningSteps(true);
    for (let step of props.dataSteps) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(props.setData(step));
        }, 10);
      });
    }
    props.setDataSteps([]);
    props.setRunningSteps(false);
  };

  return (
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
      <button onClick={runSteps}>Run Algorithm</button>
    </div>
  );
};

export default Controls;
