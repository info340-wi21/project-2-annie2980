import React, { useState, useEffect } from 'react';
import {Route, Switch, Link, Redirect, NavLink} from 'react-router-dom';
import 'whatwg-fetch';
import RecipeList from './Recipes';
import About from './About';

function App() {
  // State value of an array of current timers
  const [timerList, setTimerList] = useState([]);

  // Store recipe and task data
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

  return (
		<div>
			{/* <!-- Navigation Bar --> */}
      <header>
        <NavBar />
      </header>

      <main>
        <div>
          <Switch>
            <Route exact path="/"> <Dashboard /> </Route>
            <Route path="/recipes"> <RecipeList /> </Route>
            <Route path="/about"> <About /> </Route>
            <Redirect to="/" />
          </Switch>
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

function Dashboard() {
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
          <TimerTable />
          <div className="container-fluid">
            <p className="click-more">Click on the item to see more information!</p>
          </div>
        </section>

        {/* <!-- Add Timer --> */}
        <section id="add-timer" className="add-timer col-sm-12 col-lg-4 col-xl-3 mt-3">
          <AddTimer />
        </section>

        {/* <!-- Statistics Table --> */}
        <section className="col-sm-12 col-lg-8 col-xl-9 mt-3 mb-5">
          <StatsTable />
        </section>
      </div>
    </div>
  );
}

function TimerTable() {
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
      </tbody>
    </table>
  );
}

function AddTimer() {
  return (
    <div className="card">
      {/* <!-- Card Title and Subtitle --> */}
      <div className="container-fluid">
        <h2 className="card-title mt-2">Add a Timer</h2>
        <p className="card-subtitle">Select an item to begin:</p>
      </div>
      {/* <!-- Card Body (Forms and Button) --> */}
      <form className="container-fluid">
        <div className="row align-items-center">
          {/* <!-- Forms stack when screen is small and large --> */}
          <div className="col-sm-12 col-md-4 col-lg-12 my-3">
            <select id="item-select" className="form-control" aria-label="Select recipe item" required>
              <option value="" defaultValue>Pick an Item...</option>
            </select>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-12 my-3">
            <select id="task-select" className="form-control" aria-label="Select recipe task" required disabled>
              <option value="" defaultValue>Pick a Task...</option>
            </select>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-12 my-3">
            <select id="loc-select" className="form-control" aria-label="Select location" required disabled>
              <option value="" defaultValue>Pick a Location...</option>
            </select>
          </div>

          <div className="col-sm-12 mt-2">Expected Time:</div>
          <div className="col-sm-12 mt-2 form-group form-inline timer-input" role="timer">
            <div className="col-4 pl-0 pr-2">
              <input id="exp-hr" type="number" name="hours" min="0" max="24" className="form-control w-100" aria-label="hours remaining" required></input>
              <label htmlFor="exp-hr" className="w-100">hr</label>
            </div>
            <div className="col-4 px-2">
              <input id="exp-min" type="number" name="minutes" min="0" max="59" className="form-control w-100" aria-label="minutes remaining" required></input>
              <label htmlFor="exp-min" className="w-100">min</label>
            </div>
            <div className="col-4 pr-0 pl-2">
              <input id="exp-sec" type="number" name="seconds" min="0" max="59" className="form-control w-100" aria-label="seconds remaining" required></input>
              <label htmlFor="exp-sec" className="w-100">sec</label>
            </div>
          </div>

          <div className="col-12 mb-3 text-center">
            <button className="btn timer-btn" role="button" type="submit">Confirm Timer</button>
          </div>
        </div>
      </form>
    </div>
  );
}

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