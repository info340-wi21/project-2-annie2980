import React, { useState, useEffect } from 'react';
import {Route, Switch, Redirect, NavLink} from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import Modal from 'react-bootstrap/Modal';
import 'whatwg-fetch';
import RecipeList from './Recipes';
import About from './About';

function App() {
  // State value of an array of current timers
  const [timerList, setTimerList] = useState([
    {recipeIndex: 0, item: "Apple Pie", task: "Baking", location: "Top Oven", endTime: getEndTime(0, 0, 10)},
    {recipeIndex: 2, item: "Blueberry Scones", task: "Chilling", location: "Fridge", endTime: getEndTime(0, 0, 30)}
  ]);

  const [recipes, setRecipes] = useState([]);
  const [taskList, setTaskList] = useState([]);

  // Fetch recipe data
  useEffect(() => {
    fetch("./recipes.json")
      .then((response) => response.json())
      .then((data) => {
        let processedData = data;
        setRecipes(processedData);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);

  // Fetch task data
  useEffect(() => {
    fetch("./tasks.json")
      .then((response) => response.json())
      .then((data) => {
        let processedData = data;
        setTaskList(processedData);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);

  // Modal states
  const [modalShow, setModalShow] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [location, setLocation] = useState({});
  const [task, setTask] = useState({});

  const showModal = () => {
    setModalShow(true);
  }

  const hideModal = () => {
    setModalShow(false);
  }

  // Current recipe for modal
  const clickedOnRecipe = (currentRecipe, location, task) => {
    setRecipe(currentRecipe);
    setLocation(location);
    setTask(task);
  }

  return (
		<div>
			{/* <!-- Navigation Bar --> */}
      <header>
        <NavBar />
      </header>

      <main>
        <div>
          <Switch>
            <Route exact path="/"> <Dashboard timerList={timerList} setTimerList={setTimerList} recipes={recipes} taskList={taskList} recipeCallback={clickedOnRecipe} showModal={showModal} /> </Route>
            <Route path="/recipes"> <RecipeList /> </Route>
            <Route path="/about"> <About /> </Route>
            <Redirect to="/" />
          </Switch>
          <RecipeModal show={modalShow} onHide={hideModal} recipe={recipe} location={location} task={task}/>
        </div>
      </main>
      
      <footer className="container-fluid my-3">
        {/* <!-- Copyright --> */}
        <div className="copyright">
          <p>
            <a href="https://github.com/info340-wi21/project-1-annie2980" rel="noreferrer" target="_blank">GitHub Repo</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="http://www.washington.edu" rel="noreferrer" target="_blank">University of Washington</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            &copy; {new Date().getFullYear()} Annie Liu and Kerri Lee
          </p>
        </div>
      </footer>
		</div>
  );
}

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src="img/favicon-no-shadow.png" alt="app-icon" className="d-inline-block align-middle mr-3" title="Bakery by Goran Babic from Iconfinder"/>
          BakeTime
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" exact to="/" >Dashboard</NavLink>
            <NavLink className="nav-link" to="/recipes" >Recipes</NavLink>
            <NavLink className="nav-link" to="/about" >About</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Represents the Dashboard "page"
function Dashboard(props) {
  const {timerList, setTimerList, recipes, taskList, recipeCallback, showModal} = props;

  // Function to handle removal of a timer from timerList
  const handleRemove = function(timerRowIndex) {
    // fresh object
    const timerCopy = timerList.filter((timer, index) => {
      return index !== timerRowIndex
    });

    // just in case, sort the array before rendering
    timerCopy.sort((a, b) => a.endTime - b.endTime);

    // update state
    setTimerList(timerCopy);
  };

  // Function to handle adding a new timer to timerList
  const handleAdd = function(newTimer) {
    // fresh object
    const timerCopy = timerList.map((timer) => {
      return timer;
    });

    let timerToAdd = {};
    timerToAdd.recipeIndex = newTimer.recipeIndex;
    timerToAdd.item = newTimer.recipeName;
    timerToAdd.task = newTimer.taskName;
    timerToAdd.location = newTimer.location;
    // Calculate when the timer should go off
    timerToAdd.endTime = getEndTime(newTimer.hr, newTimer.min, newTimer.sec);

    // Update stats
    // state.totalTime += getSeconds(newTimer.hr, newTimer.min, newTimer.sec);
    // if (newTimer.taskName.includes("Baking")) {
    //     state.numTotalBakes++;
    // }

    // Add timer to list and clear state
    timerCopy.push(timerToAdd);

    // just in case, sort the array before rendering
    timerCopy.sort((a, b) => a.endTime - b.endTime);

    // update state
    setTimerList(timerCopy);
  };

  return (
    <div className="container-fluid main-container">
      {/* <!-- Button to Add Timer --> */}
      <div className="row alert alert-info add-timer-alert" role="alert">
        <span className="add-timer-text">Click to Add a New Timer:</span>
        <a className="btn ml-3" href="#add-timer">Add Timer</a>
      </div>

      <div className="row">
        {/* <!-- Timer Table --> */}
        <section className="col-sm-12 col-lg-8 col-xl-9 mt-3">
          <div className="container-fluid">
            <h1>
              Welcome to Your Dashboard!
            </h1>
            <p>Your current tasks are listed below:</p>
          </div>
          <TimerTable recipes={recipes} taskList={taskList} timerList={timerList} handleRemove={handleRemove} recipeCallback={recipeCallback} showModal={showModal}/>
          <div className="container-fluid">
            <p className="click-more">Click on the item to see more information!</p>
          </div>
        </section>

        {/* <!-- Add Timer --> */}
        <section id="add-timer" className="add-timer col-sm-12 col-lg-4 col-xl-3 mt-3">
          <AddTimer recipes={recipes} taskList={taskList} handleAdd={handleAdd} />
        </section>

        {/* <!-- Statistics Table --> */}
        <section className="col-sm-12 col-lg-8 col-xl-9 mt-3 mb-5">
          <StatsTable />
        </section>
      </div>
    </div>
  );
}

// Represents the entire table of timers
function TimerTable(props) {
  const {recipes, taskList, timerList, handleRemove, recipeCallback, showModal} = props;

  // for each timer, render a TimerRow
  let timerRows = [];
  if (timerList.length === 0) {
    timerRows = [(<tr key="0"><td colSpan="5"><b>You currently have no tasks!</b></td></tr>)];
  } else {
    timerRows = timerList.map((timer, index) => {
      return <TimerRow recipes={recipes} taskList={taskList} timer={timer} index={index} handleRemove={handleRemove} recipeCallback={recipeCallback} showModal={showModal} key={index} />
    });
  }

  return (
    <table className="table table-hover" aria-label="List of Current Tasks">
      <thead>
        <tr className="dashboard-header">
          <th scope="col" className="task-icon-text" >Task</th>
          <th scope="col">Item</th>
          <th scope="col" className="task-text" >Task</th>
          <th scope="col" className="loc-text">Location</th>
          <th scope="col" className="time-text">Time Left</th>
        </tr>
      </thead>
      <tbody id="timer-body">
        {timerRows}
      </tbody>
    </table>
  );
}

// Represents a single row in the table
function TimerRow(props) {
  const {recipes, taskList, timer, index, handleRemove, recipeCallback, showModal} = props;

  // Shows modal on click
  const handleItemClick = (event) => {
    recipeCallback(recipes[timer.recipeIndex], timer.location, timer.task);
    showModal();
  }

  return (
    <tr>
      <td className="task-icon-text"> <Icon taskList={taskList} taskName={timer.task} /> </td>
      <td className="item-text" onClick={handleItemClick}> {timer.item} </td>
      <td className="task-text"> {timer.task} </td>
      <td className="loc-text"> {timer.location} </td>
      <Time timer={timer} index={index} handleRemove={handleRemove} />
    </tr>
  )
}

// Recipe modal
function RecipeModal(props) {
  const {show, onHide, recipe, location, task} = props;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>{recipe.recipeName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RecipeText steps={recipe.steps} location={location} task={task}/>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}

// Recipe text for modal
function RecipeText(props) {
  const {steps, location, task} = props;

  let recipeSteps = steps.map((step) => {
    return <Step step={step} key={step.task}/>
  })

  return (
    <div>
      <p>
        <b>Current Location: </b> {location}
      </p>
      <p>
        <b>Current Task: </b> {task}
      </p>
      {recipeSteps}
    </div>
  );
}

// Specific step for recipe text in modal
function Step(props) {
  const {step} = props;
  let taskTime = parseTimeString(step.time);

  return (
    <div>
      <hr title={"Start of " + step.task + " Step"}></hr>
      <p>
        <b>Task: </b> {step.task}
      </p>
      <p>
        <b>Total Time: </b> {taskTime.hours + " hr " + taskTime.minutes + " min"}
      </p>
      <p>
        <b>Instructions: </b> {step.description}
      </p>
    </div>
  );
}

// Represents a task icon
function Icon(props) {
  const {taskList, taskName} = props;

  // If task list hasn't been fetched yet, don't return an image
  if (taskList.length === 0) {
    return null;
  }

  let iconObject = taskList.filter((obj) => {
    return taskName.toLowerCase().includes(obj.taskName);
  })[0];

  return (
    <img className="task-icon" src={iconObject.src} alt={iconObject.alt} title={iconObject.title}/>
  )
}

// Handles the "Time Left" table cell
function Time(props) {
  const {timer, index, handleRemove} = props;

  // Function to handle "remove" button click
  const handleClick = () => {
    handleRemove(index);
  }

  // Timer hook library - https://www.npmjs.com/package/react-timer-hook
  useTimer({ expiryTimestamp: timer.endTime });

  // Format timer string
  let t = getTimeRemaining(timer.endTime);
  let hourText = '';
  if (t.hours !== 0) {
      hourText = ('0' + t.hours).slice(-2) + ':';
  }
  let toDisplay = hourText +
                   ('0' + t.minutes).slice(-2) + ':' +
                   ('0' + t.seconds).slice(-2);

  // If timer is already completed, render button rather than new clock
  if (timer.endTime < new Date()) {
    return (
      <td className="time-text"><button className="btn" title="Click to remove timer" onClick={handleClick}> Done! </button></td>
    )
  } else {
    return (
      <td className="time-text">{toDisplay}</td>
    )
  }
}

// TIMER COUNTDOWN CODE - credit for getTimeRemaining() to Yaphi Berhanu and Nilson Jacques from SitePoint
// Calculates the amount of time remaining
// Returns an object representing the amount of time in terms of the total, hours, etc.
function getTimeRemaining(endTime){
  const total = Date.parse(endTime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000*60*60)));

  return { total, hours, minutes, seconds };
}

// Adds hours, minutes, and seconds to the current Date
function getEndTime(hr, min, sec) {
  // Calculate the amount of time, in ms, to add to the date
  let timeToAdd = 1000 * getSeconds(hr, min, sec);
  return new Date(new Date().getTime() + timeToAdd);
}

// Gets number of seconds from hours, minutes, seconds
function getSeconds(hr, min, sec) {
  return sec + 60 * (min + 60 * hr);
}

// Parses a time string in the format HH:MM:SS into an object of {hours: , minutes: , seconds: }
function parseTimeString(timeString) {
  let splitTime = timeString.split(":");
  return {hours: parseInt(splitTime[0]),
          minutes: parseInt(splitTime[1]),
          seconds: parseInt(splitTime[2])};
}

// Represents the Add Timer form
function AddTimer(props) {
  const {recipes, taskList, handleAdd} = props;

  // State
  // for reference: {recipeIndex: -1, recipeName: "", stepNum: -1, taskName: "", location: "", hr: -1, min: -1, sec: -1}
  const [newTimerInput, setNewTimerInput] = useState() // object storing information about the new timer
  const [tasks, setTasks] = useState([]) // array storing tasks to be rendered in task select
  const [locations, setLocations] = useState([]) // array storing locations to be rendered in locations select
  const [taskDis, setTaskDis] = useState(true) // boolean that stores whether or not the task select should be disabled
  const [locDis, setLocDis] = useState(true) // boolean that stores whether or not the location select should be disabled
  const [itemVal, setItemVal] = useState("") // value that controls what is currently selected in item select
  const [taskVal, setTaskVal] = useState("") // value that controls what is currently selected in task select
  const [locVal, setLocVal] = useState("") // value that controls what is currently selected in location select
  const [hrVal, setHrVal] = useState("") // value that controls what is shown in the expected hours elem
  const [minVal, setMinVal] = useState("") // value that controls what is shown in the expected minutes elem
  const [secVal, setSecVal] = useState("") // value that controls what is shown in the expected seconds elem
  const [submitDis, setSubmitDis] = useState(false) // boolean that stores whether or not the form submit button should be disabled

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity() && checkDisabled()) {
      // Add timer to list - re-render tables
      handleAdd(newTimerInput);

      // Reset form after submitting
      resetForm();
    } else {
      // Disable form until valid
      setSubmitDis(true);
    }
  }

  // Checks if the task and location selectors are still disabled
  // Returns false if still either selector is still disabled
  const checkDisabled = function() {
    return !taskDis && !locDis;
  }

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

  // Populate item select
  const itemSelect = recipes.map((recipe, index) => {
    return <option value={index} key={index}> {recipe.recipeName} </option>
  });

  // Populate task select
  const taskSelect = tasks.map((task, index) => {
    return <option value={index} key={index}> {task} </option>
  });

  // Populate location select
  const locationSelect = locations.map((location, index) => {
    return <option value={index} key={index}> {location} </option>
  });

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
      setTasks(updatedTasks);

      // Update task select - task select element to false
      setTaskDis(false);
      setTaskVal("");
    } else {
      // Update tasks - disable task select and clear tasks
      setTaskDis(true);
      setTasks([]);
    }

    // Update locations - disable location select and clear locations
    setLocDis(true);
    setLocations([]);
  };

  const handleTaskChange = (event) => {
    // Check if default isn't selected
    let taskNum = event.target.value;
    setTaskVal(taskNum);

    if (taskNum !== "") {
      // Select location from taskList
      let taskObj = taskList.filter((obj) => {
          return(event.target.selectedOptions[0].text.toLowerCase().includes(obj.taskName));
      })[0];

      // Update newTimerInput - new task should have step number and task name
      const updatedNewTimer = { ...newTimerInput };
      updatedNewTimer.stepNum = taskNum; // for internal use
      updatedNewTimer.taskName = event.target.selectedOptions[0].text;
      setNewTimerInput(updatedNewTimer);

      // Update locations
      const updatedLocs = taskObj.locations.map((location) => {
          return location;
      });
      setLocations(updatedLocs);

      // Update location select - enable location select
      setLocDis(false);
      setLocVal("");
    } else {
      // Update locations - disable location select
      setLocDis(true);
      setLocations([]);
    }
  };

  const handleLocationChange = (event) => {
    // Check if default isn't selected
    let locNum = event.target.value;
    setLocVal(locNum);

    if (locNum !== "") {
      // Update newTimerInput - new task should have location name
      const updatedNewTimer = { ...newTimerInput };
      updatedNewTimer.location = event.target.selectedOptions[0].text;

      // Update time inputs
      let timeString = recipes[updatedNewTimer.recipeIndex].steps[updatedNewTimer.stepNum].time;
      let splitTime = parseTimeString(timeString);
      setHrVal(splitTime.hours);
      setMinVal(splitTime.minutes);
      setSecVal(splitTime.seconds);

      // Update newTimerInput - new task should have expected time
      updatedNewTimer.hr = splitTime.hours;
      updatedNewTimer.min = splitTime.minutes;
      updatedNewTimer.sec = splitTime.seconds;
      setNewTimerInput(updatedNewTimer);

      // Enable form button
      setSubmitDis(false);
    }
  }

  const handleHrInput = (event) => {
    // Update controlled component
    setHrVal(event.target.value);

    // Update newTimerInput - new task should have expected hours
    const updatedNewTimer = { ...newTimerInput };
    updatedNewTimer.hr = parseInt(event.target.value);
    setNewTimerInput(updatedNewTimer);
  };

  const handleMinInput = (event) => {
    // Update controlled component
    setMinVal(event.target.value);

    // Update newTimerInput - new task should have expected minutes
    const updatedNewTimer = { ...newTimerInput };
    updatedNewTimer.min = parseInt(event.target.value);
    setNewTimerInput(updatedNewTimer);
  };

  const handleSecInput = (event) => {
    // Update controlled component
    setSecVal(event.target.value);

    // Update newTimerInput - new task should have expected seconds
    const updatedNewTimer = { ...newTimerInput };
    updatedNewTimer.sec = parseInt(event.target.value);
    setNewTimerInput(updatedNewTimer);
  };

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
            <select value={itemVal} onChange={handleItemChange} id="item-select" className="form-control" aria-label="Select recipe item" required>
              <option value="" defaultValue>Pick an Item...</option>
              {itemSelect}
            </select>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-12 my-3">
            <select value={taskVal} onChange={handleTaskChange} id="task-select" className="form-control" aria-label="Select recipe task" required disabled={taskDis}>
              <option value="" defaultValue>Pick a Task...</option>
              {taskSelect}
            </select>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-12 my-3">
            <select value={locVal} onChange={handleLocationChange} id="loc-select" className="form-control" aria-label="Select location" required disabled={locDis}>
              <option value="" defaultValue>Pick a Location...</option>
              {locationSelect}
            </select>
          </div>

          <div className="col-sm-12 mt-2">Expected Time:</div>
          <div className="col-sm-12 mt-2 form-group form-inline timer-input" role="timer">
            <div className="col-4 pl-0 pr-2">
              <input onInput={handleHrInput} value={hrVal} id="exp-hr" type="number" name="hours" min="0" max="24" className="form-control w-100" aria-label="hours remaining" required></input>
              <label htmlFor="exp-hr" className="w-100">hr</label>
            </div>
            <div className="col-4 px-2">
              <input onInput={handleMinInput} value={minVal} id="exp-min" type="number" name="minutes" min="0" max="59" className="form-control w-100" aria-label="minutes remaining" required></input>
              <label htmlFor="exp-min" className="w-100">min</label>
            </div>
            <div className="col-4 pr-0 pl-2">
              <input onInput={handleSecInput} value={secVal} id="exp-sec" type="number" name="seconds" min="0" max="59" className="form-control w-100" aria-label="seconds remaining" required></input>
              <label htmlFor="exp-sec" className="w-100">sec</label>
            </div>
          </div>

          <div className="col-12 mb-3 text-center">
            <button className="btn timer-btn" type="submit" disabled={submitDis}>Confirm Timer</button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Represents the stats table
function StatsTable() {
  return (
    <table className="table mt-3" aria-label="list of baking statistics">
      <thead>
        <tr>
          <th className="stats-header" colSpan="2">Here Are Some Fun Statistics!</th>
        </tr>
      </thead>
      <tbody id="stats-body">
        <tr>
          <td>Total Time Spent Making Food:</td>
          <td className="stats-data stats-total-time"></td>
        </tr>
        <tr>
          <td>Average Number of Bakes Per Day:</td>
          <td className="stats-data stats-avg-bakes"></td>
        </tr>
        <tr>
          <td>Average Amount of Time Spent Baking Per Day:</td>
          <td className="stats-data stats-avg-time"></td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;