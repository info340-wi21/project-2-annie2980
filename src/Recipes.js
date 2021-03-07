import React , { useState } from 'react';
import { RecipeModal } from './Modals';

function RecipeList(props) {
  const {recipes} = props;

  // Recipe Modal states
  const [modalShow, setModalShow] = useState(false);
  const [recipe, setRecipe] = useState({});

  const showModal = () => {
    setModalShow(true);
  }

  const hideModal = () => {
    setModalShow(false);
  }

  // Current recipe for modal
  const clickedOnRecipe = (currentRecipe) => {
    setRecipe(currentRecipe);
  }

  // Sort recipes by recipe name
  recipes.sort((recipeA, recipeB) => {
    let recipeNameA = recipeA.recipeName.toLowerCase();
    let recipeNameB = recipeB.recipeName.toLowerCase();

    if (recipeNameA < recipeNameB) {
      return -1;
    }

    if (recipeNameA > recipeNameB) {
      return 1;
    }
    return 0;
  });

  let recipeCards = recipes.map((recipe) => {
    return <RecipeCard recipe={recipe} showModal={showModal} recipeCallback={clickedOnRecipe} key={recipe.recipeName}/>
  })

  return (
    <div>
      <div className="container-fluid">
        {/* <!-- Recipe Cards --> */}
        <div className="row">
          {recipeCards}
        </div>
        
      </div>
      <RecipeModal show={modalShow} onHide={hideModal} recipe={recipe}/>
    </div>
  );
}

function RecipeCard(props) {
  const {recipe, showModal, recipeCallback} = props;

  const handleClick = () => {
    recipeCallback(recipe);
    showModal();
  }

  let recipeTime = parseTimeString(recipe.totalTime);

  return (
    <div className="col-md-6 col-lg-4 col-xl-3 d-flex" >
      <div className="card mt-4">
        <div className="card-body recipe-card" onClick={handleClick}>
          <div className="row">
            <div>
              <img className="card-img-top" src={recipe.src} alt={recipe.recipeName}/>
            </div>
            <div className="col">
              <h1 className="card-title">{recipe.recipeName}</h1>
              <p className="card-text">Total Time: {recipeTime.hours + " hr " + recipeTime.minutes + " min"}</p>
            </div>
          </div>
        </div>
      </div>
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

export default RecipeList;
