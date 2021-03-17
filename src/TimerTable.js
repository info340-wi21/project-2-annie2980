import React from 'react';
import { Table } from 'react-bootstrap';
import { useTimer } from 'react-timer-hook';

// Represents the entire table of timers
export function TimerTable(props) {
  /*
    Props:
    - recipes: array of recipe objects that are currently stored in recipes.json
    - taskList: array of task objects that are currently stored in tasks.json
    - timerList: array of current timers
    - handleRemove(rowIndex): callback function to remove timer from timerList
    - recipeCallback(currentRecipe, location, task, timerIndex): callback function to set recipe modal state
    - showModal(): callback function to show the recipe modal
  */
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
    <Table hover aria-label="List of Current Tasks">
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
    </Table>
  );
}

// Represents a single row in the table
function TimerRow(props) {
  const {recipes, taskList, timer, index, handleRemove, recipeCallback, showModal} = props;

  // Shows modal on click
  const handleItemClick = () => {
    recipeCallback(recipes[timer.recipeIndex], timer.location, timer.task, index);
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

// Represents a task icon
function Icon(props) {
  const {taskList, taskName} = props;

  // If task list hasn't been fetched yet, don't return an image
  if (taskList.length === 0) {
    return null;
  }
  // let actualTaskName =  Object.keys(taskList).filter((name) => {
  //   return taskName.toLowerCase().includes(name);
  // })[0];

  // let iconObject = taskList[actualTaskName];
  // console.log(actualTaskName)

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
  const handleRemoveClick = () => {
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
  let toDisplay = hourText + ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2);

  // If timer is already completed, render button rather than new clock
  if (timer.endTime < new Date()) {
    return (
      <td className="time-text"><button className="btn" title="Click to remove timer" onClick={handleRemoveClick}> Done! </button></td>
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
