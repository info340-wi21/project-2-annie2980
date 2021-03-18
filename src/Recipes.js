import React , { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
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
  let recipesCopy = recipes.map((recipe) => recipe);

  recipesCopy.sort((recipeA, recipeB) => {
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

  let recipeCards = recipesCopy.map((recipe) => {
    return <RecipeCard recipe={recipe} showModal={showModal} recipeCallback={clickedOnRecipe} key={recipe.recipeName}/>
  })

  return (
    <div>
      <Container fluid>
        {/* <!-- Recipe Cards --> */}
        <Row>
          {recipeCards}
        </Row>
        
      </Container>
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
    <Col md={6} lg={4} xl={3} className="d-flex" >
      <Card className="mt-4 recipe-card" onClick={handleClick}>
        <Card.Img variant="top" className="card-img-top" src={recipe.src} alt={recipe.recipeName}/>
        <Card.Body>
          <Row>
            <Col className="mt-0">
              <Card.Title as="h1">{recipe.recipeName}</Card.Title>
              <Card.Text as="p" >Total Time: {recipeTime.hours + " hr " + recipeTime.minutes + " min"}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
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
