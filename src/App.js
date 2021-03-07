import React, { useState, useEffect } from 'react';
import {Route, Switch, Redirect, NavLink} from 'react-router-dom';
import 'whatwg-fetch';
import RecipeList from './Recipes';
import About from './About';
import { AddTimer } from './AddTimerDash';
import { StatsTable } from './StatsTable';
import { TimerRecipeModal, DeleteTimerModal } from './Modals';
import { TimerTable } from './TimerTable';

function App() {
  // State value of an array of current timers
  const [timerList, setTimerList] = useState([
    {recipeIndex: 0, item: "Apple Pie", task: "Baking", location: "Top Oven", endTime: getEndTime(0, 0, 10)},
    {recipeIndex: 2, item: "Blueberry Scones", task: "Chilling", location: "Fridge", endTime: getEndTime(0, 0, 30)}
  ]);

  const [recipes, setRecipes] = useState([]);
  const [taskList, setTaskList] = useState([]);

  // State for statistics table - will need to fetch later?
  const [totalTime, setTotalTime] = useState(40); // in seconds
  const [totalDays] = useState(4);
  const [totalBakes, setTotalBakes] = useState(2);

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

  return (
		<div>
			{/* <!-- Navigation Bar --> */}
      <header>
        <NavBar />
      </header>

      <main>
        <div>
          <Switch>
            <Route exact path="/"> <Dashboard timerList={timerList} setTimerList={setTimerList} recipes={recipes} taskList={taskList} totalTime={totalTime} totalDays={totalDays} totalBakes={totalBakes} setTotalTime={setTotalTime} setTotalBakes={setTotalBakes} /> </Route>
            <Route path="/recipes"> <RecipeList recipes={recipes}/> </Route>
            <Route path="/about"> <About /> </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </main>
      
      <footer className="container-fluid my-3">
        {/* <!-- Copyright --> */}
        <div className="copyright">
          <p>
            <a href="https://github.com/info340-wi21/project-2-annie2980" rel="noreferrer" target="_blank">GitHub Repo</a>&nbsp;&nbsp;|&nbsp;&nbsp;
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
  const {timerList, setTimerList, recipes, taskList, totalTime, totalDays, totalBakes, setTotalTime, setTotalBakes} = props;

  // Recipe Modal states
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
  const clickedOnRecipe = (currentRecipe, location, task, timerIndex) => {
    setRecipe(currentRecipe);
    setLocation(location);
    setTask(task);
    // KERRI ADDED CODE HERE
    setTimerIndex(timerIndex);
  }

  // Callback for removing recipe using recipe modal or deleteTimerModal
  const handleRemoveAndClose = function(isRecipeModal) {
    handleRemove(clickedTimerIndex);
    setTimerIndex(0);
    isRecipeModal ? hideModal() : handleDeleteClose();
  }

  // State to handle deleteTimerModal
  const [showDelete, setShowDelete] = useState(false);
  const [clickedTimerIndex, setTimerIndex] = useState(0);

  const handleDeleteClose = () => {
    setTimerIndex(0);
    setShowDelete(false);
  }
  const handleDeleteShow = (index) => {
    setRecipe(recipes[timerList[index].recipeIndex]);
    setTimerIndex(index);
    setShowDelete(true);
  }

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
    setTotalTime(totalTime + getSeconds(newTimer.hr, newTimer.min, newTimer.sec));
    if (newTimer.taskName.includes("Baking")) {
        setTotalBakes(totalBakes + 1);
    }

    // Add timer to list and clear state
    timerCopy.push(timerToAdd);

    // just in case, sort the array before rendering
    timerCopy.sort((a, b) => a.endTime - b.endTime);

    // update state
    setTimerList(timerCopy);
  };

  return (
    <div>
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
            <TimerTable recipes={recipes} taskList={taskList} timerList={timerList} handleRemove={handleRemove} recipeCallback={clickedOnRecipe} showModal={showModal} handleDeleteShow={handleDeleteShow} />
            <div className="container-fluid">
              <p className="tap-more">Tap on the item to see more information!</p>
              <p className="click-more">Click on the item to see more information!</p>
            </div>
          </section>

          {/* <!-- Add Timer --> */}
          <section id="add-timer" className="add-timer col-sm-12 col-lg-4 col-xl-3 mt-3">
            <AddTimer recipes={recipes} taskList={taskList} handleAdd={handleAdd} />
          </section>

          {/* <!-- Statistics Table --> */}
          <section className="col-sm-12 col-lg-8 col-xl-9 mt-3 mb-5">
            <StatsTable totalTime={totalTime} totalDays={totalDays} totalBakes={totalBakes} />
          </section>
        </div>
      </div>
      {/* <!-- Recipe Info Modal --> */}
      <TimerRecipeModal show={modalShow} onHide={hideModal} recipe={recipe} location={location} task={task} handleRemoveAndClose={handleRemoveAndClose}/>
      {/* <!-- Delete Timer Modal --> */}
      <DeleteTimerModal show={showDelete} onHide={handleDeleteClose} handleRemoveAndClose={handleRemoveAndClose} recipe={recipe}/>
    </div>
  );
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

export default App;
