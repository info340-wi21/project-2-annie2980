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
      
      <footer class="container-fluid my-3">
        {/* <!-- Copyright --> */}
        <div class="copyright">
          <p>
            <a href="https://github.com/info340-wi21/project-1-annie2980" target="_blank">GitHub Repo</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="http://www.washington.edu" target="_blank">University of Washington</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            &copy; <script>document.write(new Date().getFullYear())</script> Annie Liu and Kerri Lee
          </p>
        </div>
      </footer>
		</div>
  );
}

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          <img src="img/favicon-no-shadow.png" alt="app-icon" class="d-inline-block align-middle mr-2" title="Bakery by Goran Babic from Iconfinder"/>
          BakeTime
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link class="nav-link" exact to="/" >Dashboard</Link>
            <Link class="nav-link" to="/recipes" >Recipes</Link>
            <Link class="nav-link" to="/about" >About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Dashboard() {
  return (
    <div class="container-fluid main-container">
      {/* <!-- Button to Add Timer --> */}
      <div class="row alert alert-info add-timer-alert" role="alert">
        <span class="add-timer-text">Click to Add a New Timer:</span>
        <a class="btn ml-3" href="#add-timer">Add Timer</a>
      </div>

      <div class="row">
        {/* <!-- Timer Table --> */}
        <section class="col-sm-12 col-lg-8 col-xl-9 mt-3">
          <div class="container-fluid">
            <h1>
              Welcome to Your Dashboard!
            </h1>
            <p>Your current tasks are listed below:</p>
          </div>
          <TimerTable />
          <div class="container-fluid">
            <p class="click-more">Click on the item to see more information!</p>
          </div>
        </section>

        {/* <!-- Add Timer --> */}
        <section id="add-timer" class="add-timer col-sm-12 col-lg-4 col-xl-3 mt-3">
          <AddTimer />
        </section>

        {/* <!-- Statistics Table --> */}
        <section class="col-sm-12 col-lg-8 col-xl-9 mt-3 mb-5">
          <StatsTable />
        </section>
      </div>
    </div>
  );
}

function TimerTable() {
  return (
    <table class="table table-hover" aria-label="List of Current Tasks">
      <thead>
        <tr class="dashboard-header">
          <th scope="col" class="task-icon-text" >Task</th>
          <th scope="col">Item</th>
          <th scope="col" class="task-text" >Task</th>
          <th scope="col" class="loc-text">Location</th>
          <th scope="col" class="time-text">Time Left</th>
        </tr>
      </thead>
      <tbody id="timer-body">
      </tbody>
    </table>
  );
}

function AddTimer() {
  return (
    <div class="card">
      {/* <!-- Card Title and Subtitle --> */}
      <div class="container-fluid">
        <h2 class="card-title mt-2">Add a Timer</h2>
        <p class="card-subtitle">Select an item to begin:</p>
      </div>
      {/* <!-- Card Body (Forms and Button) --> */}
      <form class="container-fluid">
        <div class="row align-items-center">
          {/* <!-- Forms stack when screen is small and large --> */}
          <div class="col-sm-12 col-md-4 col-lg-12 my-3">
            <select id="item-select" class="form-control" aria-label="Select recipe item" required>
              <option value="" selected>Pick an Item...</option>
            </select>
          </div>

          <div class="col-sm-12 col-md-4 col-lg-12 my-3">
            <select id="task-select" class="form-control" aria-label="Select recipe task" required disabled>
              <option value="" selected>Pick a Task...</option>
            </select>
          </div>

          <div class="col-sm-12 col-md-4 col-lg-12 my-3">
            <select id="loc-select" class="form-control" aria-label="Select location" required disabled>
              <option value="" selected>Pick a Location...</option>
            </select>
          </div>

          <div class="col-sm-12 mt-2">Expected Time:</div>
          <div class="col-sm-12 mt-2 form-group form-inline timer-input" role="timer">
            <div class="col-4 pl-0 pr-2">
              <input id="exp-hr" type="number" name="hours" min="0" max="24" class="form-control w-100" aria-label="hours remaining" required></input>
              <label for="exp-hr" class="w-100">hr</label>
            </div>
            <div class="col-4 px-2">
              <input id="exp-min" type="number" name="minutes" min="0" max="59" class="form-control w-100" aria-label="minutes remaining" required></input>
              <label for="exp-min" class="w-100">min</label>
            </div>
            <div class="col-4 pr-0 pl-2">
              <input id="exp-sec" type="number" name="seconds" min="0" max="59" class="form-control w-100" aria-label="seconds remaining" required></input>
              <label for="exp-sec" class="w-100">sec</label>
            </div>
          </div>

          <div class="col-12 mb-3 text-center">
            <button class="btn timer-btn" role="button" type="submit">Confirm Timer</button>
          </div>
        </div>
      </form>
    </div>
  );
}

function StatsTable() {
  return (
    <table class="table mt-3" aria-label="list of baking statistics">
      <thead>
        <tr>
          <th class="stats-header" colSpan="2">Here Are Some Fun Statistics!</th>
        </tr>
      </thead>
      <tbody id="stats-body">
        <tr>
          <td>Total Time Spent Making Food:</td>
          <td class="stats-data stats-total-time"></td>
        </tr>
        <tr>
          <td>Average Number of Bakes Per Day:</td>
          <td class="stats-data stats-avg-bakes"></td>
        </tr>
        <tr>
          <td>Average Amount of Time Spent Baking Per Day:</td>
          <td class="stats-data stats-avg-time"></td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;