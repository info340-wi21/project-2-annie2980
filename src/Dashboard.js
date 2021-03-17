import React, { useState } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import firebase from 'firebase/app';
import { AddTimer } from './AddTimerDash';
import { StatsTable } from './StatsTable';
import { TimerRecipeModal } from './Modals';
import { TimerTable } from './TimerTable';

// Represents the Dashboard "page"
function Dashboard(props) {
  /*
    Props:
    - user: firebase user object
    - timerList: array of current timers
    - recipes: array of recipes
    - taskList: array of different tasks
    - totalTime: number representing the total amount of time spent baking (in seconds)
    - totalDays: number representing the number of days this account as existed
    - totalBakes: number representing the total number of bakes
  */
  const {user, timerList, recipes, taskList, totalTime, totalDays, totalBakes} = props;

  // Recipe Modal states
  const [modalShow, setModalShow] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [location, setLocation] = useState({});
  const [task, setTask] = useState({});
  const [clickedTimerIndex, setTimerIndex] = useState(0);

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
    setTimerIndex(timerIndex);
  }

  // Callback for removing recipe using recipe modal or deleteTimerModal
  const handleRemoveAndClose = function() {
    handleRemove(clickedTimerIndex);
    setTimerIndex(0);
    hideModal();
  }

  // Function to handle removal of a timer from timerList
  const handleRemove = function(timerRowIndex) {
    // fresh object
    const timerCopy = timerList.filter((timer, index) => {
      return index !== timerRowIndex
    });

    // Just in case, sort the array before rendering
    timerCopy.sort((a, b) => a.endTime - b.endTime);

    // Convert date objects to ms
    timerCopy.forEach((obj) => {
      obj.endTime = obj.endTime.getTime();
    })

    // Update state
    // Push new timerList to database
    const timerListRef = firebase.database().ref(user.uid + "/timerList");
    timerListRef.set(timerCopy);
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
    // Push stats to database
    const userRef = firebase.database().ref(user.uid + "/stats");
    userRef.child("totalTime").set(totalTime + getSeconds(newTimer.hr, newTimer.min, newTimer.sec));
    if (newTimer.taskName.includes("Baking")) {
      userRef.child("totalBakes").set(totalBakes + 1);
    }

    // Add timer to list and clear state
    timerCopy.push(timerToAdd);

    // Just in case, sort the array before rendering
    timerCopy.sort((a, b) => a.endTime - b.endTime);

    // Convert date objects to ms
    timerCopy.forEach((obj) => {
      obj.endTime = obj.endTime.getTime();
    });

    // Update state
    // Push new timerList to database
    const timerListRef = firebase.database().ref(user.uid + "/timerList");
    timerListRef.set(timerCopy);
  };

  return (
    <div>
      <Container className="main-container" fluid>
        {/* <!-- Button to Add Timer --> */}
        <Row>
          <AddTimerAlert/>
        </Row>

        <Row>
          {/* <!-- Timer Table --> */}
          <TimerTable username={user.displayName} recipes={recipes} taskList={taskList} timerList={timerList} handleRemove={handleRemove} recipeCallback={clickedOnRecipe} showModal={showModal}/>

          {/* <!-- Add Timer --> */}
          <AddTimer recipes={recipes} taskList={taskList} handleAdd={handleAdd} />

          {/* <!-- Statistics Table --> */}
          <StatsTable totalTime={totalTime} totalDays={totalDays} totalBakes={totalBakes} />
        </Row>
      </Container>
      {/* <!-- Recipe Info Modal --> */}
      <TimerRecipeModal show={modalShow} onHide={hideModal} recipe={recipe} location={location} task={task} handleRemoveAndClose={handleRemoveAndClose}/>
    </div>
  );
}

function AddTimerAlert() {
  return (
    <Alert variant="info" className="add-timer-alert w-100" role="alert">
      <span className="add-timer-text">Click to Add a New Timer:</span>
      <a className="btn ml-3" href="#add-timer">Add Timer</a>
  </Alert>
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

export default Dashboard;
