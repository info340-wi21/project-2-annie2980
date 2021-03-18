import React from 'react';
import { Image } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

// Recipe modal
export function TimerRecipeModal(props) {
  /*
    Props:
    - show: boolean representing whether the modal is showing or not
    - onHide: callback function for hiding the modal
    - recipe: recipe object to be shown in the modal
    - location: current location of task
    - task: current task being timed
    - handleRemoveAndClose(): callback function for removing the current timer from the list
  */
  const {show, onHide, recipe, location, task, handleRemoveAndClose} = props;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title className="modal-title">{recipe.recipeName}</Modal.Title>
        <button className="btn delete-btn" onClick={handleRemoveAndClose}>Delete Timer</button>
      </Modal.Header>
      <Modal.Body>
        <TimerRecipeText name={recipe.recipeName} src={recipe.src} steps={recipe.steps} location={location} task={task}/>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={onHide}>Close Recipe</button>
      </Modal.Footer>
    </Modal>
  );
}

// Recipe modal for recipe card
export function RecipeModal(props) {
  /*
    Props:
    - show: boolean representing whether the modal is showing or not
    - onHide: callback function for hiding the modal
    - recipe: recipe object to be shown in the modal
  */
  const {show, onHide, recipe} = props;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title className="modal-title">{recipe.recipeName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RecipeText recipe={recipe}/>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={onHide}>Close Recipe</button>
      </Modal.Footer>
    </Modal>
  );
}

// Recipe text for modal
function TimerRecipeText(props) {
  const {recipeName, src, steps, location, task} = props;

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
      <hr title={"End of timer information"}/>
      <div className="text-center">
        <Image src={src} className="w-75" alt={recipeName} rounded/>
      </div>
      {recipeSteps}
    </div>
  );
}

// Recipe text for modal
function RecipeText(props) {
  const {recipe} = props;

  let recipePrepTime = parseTimeString(recipe.prepTime);
  let recipeCookTime = parseTimeString(recipe.cookTime);
  let recipeTotalTime = parseTimeString(recipe.totalTime);

  let recipeSteps = recipe.steps.map((step) => {
    return <Step step={step} key={step.task}/>
  })

  return (
    <div>
      <p>
        <b>Prep Time: </b> {recipePrepTime.hours + " hr " + recipePrepTime.minutes + " min"}
      </p>
      <p>
        <b>Cook Time: </b> {recipeCookTime.hours + " hr " + recipeCookTime.minutes + " min"}
      </p>
      <p>
        <b>Total Time: </b> {recipeTotalTime.hours + " hr " + recipeTotalTime.minutes + " min"}
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
      <hr title={"Start of " + step.task + " Step"}/>
      <p>
        <b>Task: </b> {step.task}
      </p>
      <p>
        <b>Task Time: </b> {taskTime.hours + " hr " + taskTime.minutes + " min"}
      </p>
      <p>
        <b>Instructions: </b> {step.description}
      </p>
    </div>
  );
}

// Parses a time string in the format HH:MM:SS into an object of {hours: , minutes: , seconds: }
function parseTimeString(timeString) {
  let splitTime = timeString.split(":");
  return {hours: parseInt(splitTime[0]),
          minutes: parseInt(splitTime[1]),
          seconds: parseInt(splitTime[2])};
}
