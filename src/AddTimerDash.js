import React, { useState } from 'react';

// Represents the Add Timer form
export function AddTimer(props) {
  /*
    Props:
    - recipes: array of recipes
    - taskList: array of different tasks
    - handleAdd(newTimerInput): callback function to add a timer to the list of current timers
  */
  const {recipes, taskList, handleAdd} = props;

  // State
  // for reference: {recipeIndex: -1, recipeName: "", stepNum: -1, taskName: "", location: "", hr: -1, min: -1, sec: -1}
  const [newTimerInput, setNewTimerInput] = useState(); // object storing information about the new timer
  const [tasks, setTasks] = useState([]); // array storing tasks to be rendered in task select
  const [locations, setLocations] = useState([]); // array storing locations to be rendered in locations select
  const [taskDis, setTaskDis] = useState(true); // boolean that stores whether or not the task select should be disabled
  const [locDis, setLocDis] = useState(true); // boolean that stores whether or not the location select should be disabled

  // Controlled input values
  const [itemVal, setItemVal] = useState(""); // value that controls what is currently selected in item select
  const [taskVal, setTaskVal] = useState(""); // value that controls what is currently selected in task select
  const [locVal, setLocVal] = useState(""); // value that controls what is currently selected in location select
  const [hrVal, setHrVal] = useState(""); // value that controls what is shown in the expected hours elem
  const [minVal, setMinVal] = useState(""); // value that controls what is shown in the expected minutes elem
  const [secVal, setSecVal] = useState(""); // value that controls what is shown in the expected seconds elem

  // Set state as objects
  const taskState = {items: tasks, setItems: setTasks, selectVal: taskVal, setSelectVal: setTaskVal, disabled: taskDis, setDisabled: setTaskDis};
  const locState = {items: locations, setItems: setLocations, selectVal: locVal, setSelectVal: setLocVal, disabled: locDis, setDisabled: setLocDis};

  // Function to set all three timer inputs
  const setTimerInputs = function(hours, minutes, seconds) {
    setHrVal(hours);
    setMinVal(minutes);
    setSecVal(seconds);
  };

  // Callback for submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity() && checkDisabled()) {
      console.log("valid")
      // Add timer to list - re-render tables
      handleAdd(newTimerInput);

      // Reset form after submitting
      resetForm();
    }
  }

  // Checks if the task and location selectors are still disabled
  // Returns false if still either selector is still disabled
  const checkDisabled = function() {
    return !taskDis && !locDis;
  }

  // Resets the form to original state
  const resetForm = function() {
    setTaskDis(true);
    setTasks([]);
    setTaskVal("");
    setLocDis(true);
    setLocations([]);
    setLocVal("");
    setItemVal("");
    setHrVal("");
    setMinVal("");
    setSecVal("");
  }

  return (
    <div className="card">
      {/* <!-- Card Title and Subtitle --> */}
      <div className="container-fluid">
        <h2 className="card-title mt-2">Add a Timer</h2>
        <p className="card-subtitle">Select an item to begin:</p>
      </div>
      {/* <!-- Card Body (Forms and Button) --> */}
      <form onSubmit={handleSubmit} className="container-fluid">
        <div className="row align-items-center">
          {/* <!-- Forms stack when screen is small and large --> */}
          <div className="col-sm-12 col-md-4 col-lg-12 my-3">
            <ItemSelect recipes={recipes} itemVal={itemVal} setItemVal={setItemVal} taskState={taskState} locState={locState} newTimerInput={newTimerInput} setNewTimerInput={setNewTimerInput}/>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-12 my-3">
            <TaskSelect taskList={taskList} taskState={taskState} locState={locState} newTimerInput={newTimerInput} setNewTimerInput={setNewTimerInput} />
          </div>

          <div className="col-sm-12 col-md-4 col-lg-12 my-3">
            <LocationSelect recipes={recipes} taskState={taskState} locState={locState} setTimerInputs={setTimerInputs} newTimerInput={newTimerInput} setNewTimerInput={setNewTimerInput} />
          </div>

          <div className="col-sm-12 mt-2">Expected Time:</div>
          <div className="col-sm-12 mt-2 form-group form-inline timer-input" role="timer">
            <div className="col-4 pl-0 pr-2">
              <HourInput hrVal={hrVal} setHrVal={setHrVal} newTimerInput={newTimerInput} setNewTimerInput={setNewTimerInput} />
              <label htmlFor="exp-hr" className="w-100">hr</label>
            </div>
            <div className="col-4 px-2">
              <MinuteInput minVal={minVal} setMinVal={setMinVal} newTimerInput={newTimerInput} setNewTimerInput={setNewTimerInput} />
              <label htmlFor="exp-min" className="w-100">min</label>
            </div>
            <div className="col-4 pr-0 pl-2">
              <SecondInput secVal={secVal} setSecVal={setSecVal} newTimerInput={newTimerInput} setNewTimerInput={setNewTimerInput} />
              <label htmlFor="exp-sec" className="w-100">sec</label>
            </div>
          </div>

          <div className="col-12 mb-3 text-center">
            <button className="btn timer-btn" type="submit">Confirm Timer</button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Controls the select item dropdown
function ItemSelect(props) {
  const { recipes, itemVal, setItemVal, taskState, locState, newTimerInput, setNewTimerInput } = props;

  // Populate item select
  const itemSelect = recipes.map((recipe, index) => {
    return <option value={index} key={index}> {recipe.recipeName} </option>
  });

  // Handle item select callback
  const handleItemChange = (event) => {
    // Check if default isn't selected
    let itemNum = event.target.value;
    setItemVal(itemNum);

    if (itemNum !== "") {
      // Select recipe
      const recipe = recipes[itemNum];

      // Update newTimerInput - new task should have recipe index and name
      const updatedNewTimer = { ...newTimerInput };
      updatedNewTimer.recipeIndex = itemNum;
      updatedNewTimer.recipeName = recipe.recipeName;
      setNewTimerInput(updatedNewTimer);

      // Update tasks - tasks should be populated with recipe's steps
      const updatedTasks = recipe.steps.map((step) => {
          return step.task
      });
      taskState.setItems(updatedTasks);

      // Update task select - task select element to false
      taskState.setDisabled(false);
      taskState.setSelectVal("");
    } else {
      // Update tasks - disable task select and clear tasks
      taskState.setDisabled(true);
      taskState.setItems([]);
    }

    // Update locations - disable location select and clear locations
    locState.setDisabled(true);
    locState.setItems([]);
  };

  return (
    <select value={itemVal} onChange={handleItemChange} id="item-select" className="form-control" aria-label="Select recipe item" required>
      <option value="" defaultValue>Pick an Item...</option>
      {itemSelect}
    </select>
  );
}

// Controls the select task dropdown
function TaskSelect(props) {
  const { taskList, taskState, locState, newTimerInput, setNewTimerInput } = props;

  // Populate task select
  const taskSelect = taskState.items.map((task, index) => {
    return <option value={index} key={index}> {task} </option>
  });

  // Handle task select callback
  const handleTaskChange = (event) => {
    // Check if default isn't selected
    let taskNum = event.target.value;
    taskState.setSelectVal(taskNum);

    if (taskNum !== "") {
      // Select location from taskList
      let actualTaskName =  Object.keys(taskList).filter((name) => {
        return event.target.selectedOptions[0].text.toLowerCase().includes(name);
      })[0];

      let taskObj = taskList[actualTaskName];
      // let taskObj = taskList.filter((obj) => {
      //     return(event.target.selectedOptions[0].text.toLowerCase().includes(obj.taskName));
      // })[0];

      // Update newTimerInput - new task should have step number and task name
      const updatedNewTimer = { ...newTimerInput };
      updatedNewTimer.stepNum = taskNum; // for internal use
      updatedNewTimer.taskName = event.target.selectedOptions[0].text;
      setNewTimerInput(updatedNewTimer);

      // Update locations
      const updatedLocs = Object.keys(taskObj.locations).map((locationNum) => {
        return taskObj.locations[locationNum];
      });
      // const updatedLocs = taskObj.locations.map((location) => {
      //     return location;
      // });
      locState.setItems(updatedLocs);

      // Update location select - enable location select
      locState.setDisabled(false);
      locState.setSelectVal("");
    } else {
      // Update locations - disable location select
      locState.setDisabled(true);
      locState.setItems([]);
    }
  };

  return (
    <select value={taskState.selectVal} onChange={handleTaskChange} id="task-select" className="form-control" aria-label="Select recipe task" required disabled={taskState.disabled}>
      <option value="" defaultValue>Pick a Task...</option>
      {taskSelect}
    </select>
  );
}

// Controls the select location dropdown
function LocationSelect(props) {
  const { recipes, locState, setTimerInputs, newTimerInput, setNewTimerInput } = props;

  // Populate location select
  const locationSelect = locState.items.map((location, index) => {
    return <option value={index} key={index}> {location} </option>
  });

  const handleLocationChange = (event) => {
    // Check if default isn't selected
    let locNum = event.target.value;
    locState.setSelectVal(locNum);

    if (locNum !== "") {
      // Update newTimerInput - new task should have location name
      const updatedNewTimer = { ...newTimerInput };
      updatedNewTimer.location = event.target.selectedOptions[0].text;

      // Update time inputs
      let timeString = recipes[updatedNewTimer.recipeIndex].steps[updatedNewTimer.stepNum].time;
      let splitTime = parseTimeString(timeString);
      setTimerInputs(splitTime.hours, splitTime.minutes, splitTime.seconds);

      // Update newTimerInput - new task should have expected time
      updatedNewTimer.hr = splitTime.hours;
      updatedNewTimer.min = splitTime.minutes;
      updatedNewTimer.sec = splitTime.seconds;
      setNewTimerInput(updatedNewTimer);
    }
  }

  return (
    <select value={locState.selectVal} onChange={handleLocationChange} id="loc-select" className="form-control" aria-label="Select location" required disabled={locState.disabled}>
      <option value="" defaultValue>Pick a Location...</option>
      {locationSelect}
    </select>
  );
}

// Controls the hour input element
function HourInput(props) {
  const { hrVal, setHrVal, newTimerInput, setNewTimerInput } = props

  const handleHrInput = (event) => {
    // Update controlled component
    setHrVal(event.target.value);

    // Update newTimerInput - new task should have expected hours
    const updatedNewTimer = { ...newTimerInput };
    updatedNewTimer.hr = parseInt(event.target.value);
    setNewTimerInput(updatedNewTimer);
  };

  return (
    <input onInput={handleHrInput} value={hrVal} id="exp-hr" type="number" name="hours" min="0" max="24" className="form-control w-100" aria-label="hours remaining" required></input>
  );
}

// Controls the minute input element
function MinuteInput(props) {
  const { minVal, setMinVal, newTimerInput, setNewTimerInput } = props

  const handleMinInput = (event) => {
    // Update controlled component
    setMinVal(event.target.value);

    // Update newTimerInput - new task should have expected minutes
    const updatedNewTimer = { ...newTimerInput };
    updatedNewTimer.min = parseInt(event.target.value);
    setNewTimerInput(updatedNewTimer);
  };

  return (
    <input onInput={handleMinInput} value={minVal} id="exp-min" type="number" name="minutes" min="0" max="59" className="form-control w-100" aria-label="minutes remaining" required></input>
  );
}

// Controls the second input element
function SecondInput(props) {
  const { secVal, setSecVal, newTimerInput, setNewTimerInput } = props

  const handleSecInput = (event) => {
    // Update controlled component
    setSecVal(event.target.value);

    // Update newTimerInput - new task should have expected seconds
    const updatedNewTimer = { ...newTimerInput };
    updatedNewTimer.sec = parseInt(event.target.value);
    setNewTimerInput(updatedNewTimer);
  };

  return (
    <input onInput={handleSecInput} value={secVal} id="exp-sec" type="number" name="seconds" min="0" max="59" className="form-control w-100" aria-label="seconds remaining" required></input>
  );
}

// Parses a time string in the format HH:MM:SS into an object of {hours: , minutes: , seconds: }
function parseTimeString(timeString) {
  let splitTime = timeString.split(":");
  return {hours: parseInt(splitTime[0]),
          minutes: parseInt(splitTime[1]),
          seconds: parseInt(splitTime[2])};
}
