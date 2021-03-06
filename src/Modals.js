import React from 'react';
import Modal from 'react-bootstrap/Modal';

// Recipe modal
export function RecipeModal(props) {
  /*
    Props:
    - show: boolean representing whether the modal is showing or not
    - onHide: callback function for hiding the modal
    - recipe: recipe object to be shown in the modal
    - task: current task being timed
    - handleRemoveAndClose(bool): callback function for removing the current timer from the list
  */
  const {show, onHide, recipe, location, task, handleRemoveAndClose} = props;
  
  // KERRI ADDED CODE HERE
  const handleClick = () => handleRemoveAndClose(true);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>{recipe.recipeName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RecipeText steps={recipe.steps} location={location} task={task}/>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn delete-btn" onClick={handleClick}>Delete Timer</button>
        <button className="btn" onClick={onHide}>Close Recipe</button>
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

// DeleteTimer modal
export function DeleteTimerModal(props) {
  /*
    Props:
    - show: boolean representing whether the modal is showing or not
    - handleRemoveAndClose(bool): callback function for removing the current timer from the list
    - recipe: recipe object to be shown in the modal
  */
  const {show, onHide, handleRemoveAndClose, recipe} = props;

  const handleClick = () => handleRemoveAndClose(false);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>Delete Timer for {recipe.recipeName}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Press <b>Delete Timer</b> to remove the timer from the list.</p>
        <p>Press <b>Close</b> to close this window.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn delete-btn" onClick={handleClick}>Delete Timer</button>
        <button className="btn" onClick={onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}

// Parses a time string in the format HH:MM:SS into an object of {hours: , minutes: , seconds: }
function parseTimeString(timeString) {
  let splitTime = timeString.split(":");
  return {hours: parseInt(splitTime[0]),
          minutes: parseInt(splitTime[1]),
          seconds: parseInt(splitTime[2])};
}
