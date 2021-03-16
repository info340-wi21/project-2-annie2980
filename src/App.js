import React, { useState, useEffect } from 'react';
import {Route, Switch, Redirect, NavLink} from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'whatwg-fetch';
import RecipeList from './Recipes';
import About from './About';
import { AddTimer } from './AddTimerDash';
import { StatsTable } from './StatsTable';
import { AddRecipeModal, UpdateRecipesModal, UpdateTasksAndLocationsModal, TimerRecipeModal } from './Modals';
import { TimerTable } from './TimerTable';

// FirebaseUI config
const uiConfig = {
  // Which sign-in providers to use
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requiredDisplayName: true
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // page won't show account chooser
  credentialHelper: 'none',
  // use popup instead of redirect for external sign-in methods
  signInFlow: 'popup',
  callbacks: {
    // avoid redirects after sign-in
    signInSuccessWithAuthResult: () => false,
  },
}

function App() {
  // Authentication state
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

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

  // Auth state event listener
  useEffect(() => {
    // runs after component loads
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // logged in
        setUser(firebaseUser);
        setIsLoading(false);
        
        // Reference to the user in the database
        const userRef = firebase.database().ref(user.displayName);
        const recipesRef = userRef.child('recipes');
        const tasksRef = userRef.child('tasks');
        const statsRef = userRef.child('stats');

        recipesRef.set({
          "Pumpkin Pie": {
            "recipeName": "Pumpkin Pie",
            "steps": {
              "First Baking": {
                "task": "First Baking",
                "time": "00:15:00",
                "description": "Bake at 425 degrees F for 15 minutes."
              },
              "Second Baking": {
                "task": "Second Baking",
                "time": "00:40:00",
                "description": "Reduce oven temperature to 350 degrees F and continue baking 35 to 40 minutes or until knife inserted 1 inch from crust comes out clean."
              }
            },
            "prepTime": "00:15:00",
            "cookTime": "00:55:00",
            "totalTime": "01:10:00",
            "src": "img/pumpkin-pie.jpg"
          }
        });
        
        // Set recipes to what is in the database
        recipesRef.on('value', (snapshot) => {
          const theRecipesObj = snapshot.val();
          let objectKeyArray = Object.keys(theRecipesObj)
          let recipesArray = objectKeyArray.map((key) => {
            let singleRecipeObj = theRecipesObj[key];
            singleRecipeObj.key = key;
            return singleRecipeObj;
          })
          setRecipes(recipesArray);
        })  
        
        // Set taskList to what is in the database
        // tasksRef.on('value', (snapshot) => {
        //   const theTasksObj = snapshot.val();
        //   let objectKeyArray = Object.keys(theTasksObj)
        //   let tasksArray = objectKeyArray.map((key) => {
        //     let singleTaskObj = theTasksObj[key];
        //     singleTaskObj.key = key;
        //     return singleTaskObj;
        //   })
        //   setTaskList(tasksArray);
        // })
      } else {
        // logged out
        setUser(null);
        setIsLoading(false);
      }
    })

    return function cleanup() {
      authUnregisterFunction();
    }
  });

  // Reference to the user in the database
  // const userRef = firebase.database().ref("user1");
  // const recipesRef = userRef.child('recipes');
  // const tasksRef = userRef.child('tasks');
  // const statsRef = userRef.child('stats');
  
  // Set recipes to what is in the database
  // useEffect(() => {
  //   recipesRef.on('value', (snapshot) => {
  //     const theRecipesObj = snapshot.val();
  //     let objectKeyArray = Object.keys(theRecipesObj)
  //     let recipesArray = objectKeyArray.map((key) => {
  //       let singleRecipeObj = theRecipesObj[key];
  //       singleRecipeObj.key = key;
  //       return singleRecipeObj;
  //     })
  //     setRecipes(recipesArray);
  //   })
  // }, [])

  // Set taskList to what is in the database
  // useEffect(() => {
  //   tasksRef.on('value', (snapshot) => {
  //     const theTasksObj = snapshot.val();
  //     let objectKeyArray = Object.keys(theTasksObj)
  //     let tasksArray = objectKeyArray.map((key) => {
  //       let singleTaskObj = theTasksObj[key];
  //       singleTaskObj.key = key;
  //       return singleTaskObj;
  //     })
  //     setTaskList(tasksArray);
  //   })
  // }, [])

  // Fetch recipe data
  // useEffect(() => {
  //   fetch("./recipes.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       let processedData = data;
  //       setRecipes(processedData);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     })
  // }, []);

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

  // AddRecipeModal states
  const [addRecipeModalShow, setAddRecipeModalShow] = useState(false);

  const showAddRecipeModal = () => {
    setAddRecipeModalShow(true);
  }

  const hideAddRecipeModal = () => {
    setAddRecipeModalShow(false);
  }

  // UpdateRecipesModal states
  const [updateRecipesModalShow, setUpdateRecipesModalShow] = useState(false);

  const showUpdateRecipesModal = () => {
    setUpdateRecipesModalShow(true);
  }

  const hideUpdateRecipesModal = () => {
    setUpdateRecipesModalShow(false);
  }
  
  // UpdateTasksAndLocationsModal states
  const [updateTasksAndLocationsModalShow, setUpdateTasksAndLocationsModalShow] = useState(false);

  const showUpdateTasksAndLocationsModal = () => {
    setUpdateTasksAndLocationsModalShow(true);
  }

  const hideUpdateTasksAndLocationsModal = () => {
    setUpdateTasksAndLocationsModalShow(false);
  }
  
  // A callback function for logging out the current user
  const handleSignOut = () => {
    firebase.auth().signOut();
  }

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        Connecting...
      </div>
    );
  }

  let content = null // content to render

  if (!user) { // if logged out, show signup form
    content = (
      <Login uiConfig={uiConfig} />
    )
  } else { // if logged in, show welcome message
    content = (
      <div>
        {/* <!-- Navigation Bar --> */}
        <header>
          <NavigationBar user={user} handleSignOut={handleSignOut} showAddRecipeModal={showAddRecipeModal} showUpdateRecipesModal={showUpdateRecipesModal} showUpdateTasksAndLocationsModal={showUpdateTasksAndLocationsModal} />
        </header>

        <main>
          <div>
            <Switch>
              <Route exact path="/"> <Dashboard user={user} timerList={timerList} setTimerList={setTimerList} recipes={recipes} taskList={taskList} totalTime={totalTime} totalDays={totalDays} totalBakes={totalBakes} setTotalTime={setTotalTime} setTotalBakes={setTotalBakes} /> </Route>
              <Route path="/recipes"> <RecipeList recipes={recipes}/> </Route>
              <Route path="/about"> <About /> </Route>
              <Redirect to="/" />
            </Switch>
          </div>
          <AddRecipeModal show={addRecipeModalShow} onHide={hideAddRecipeModal}/>
          <UpdateRecipesModal show={updateRecipesModalShow} onHide={hideUpdateRecipesModal}/>
          <UpdateTasksAndLocationsModal show={updateTasksAndLocationsModalShow} onHide={hideUpdateTasksAndLocationsModal} />
        </main>
      </div>
    )
  }

  return (
    <div>
      {content}
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

function NavigationBar(props) {
  const {user, handleSignOut, showAddRecipeModal, showUpdateRecipesModal, showUpdateTasksAndLocationsModal} = props;

  let profilePic = "img/croissant.jpg";
  if (user.photoURL !== null) {
    profilePic = user.photoURL
  }

  return (
    <Navbar className="navbar" expand="md">
      <NavLink className="navbar-brand" exact to="/">
        <img src="img/favicon-no-shadow.png" alt="app icon" className="d-inline-block align-middle mr-3" title="Bakery by Goran Babic from Iconfinder"/>
        BakeTime
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="nav-link" exact to="/" >Dashboard</NavLink>
          <NavLink className="nav-link" to="/recipes" >Recipes</NavLink>
          <NavLink className="nav-link" to="/about" >About</NavLink>
        </Nav>
        <Nav>
          <NavDropdown id="user-options" title={<span><span className="navbar-profile-name">My Options</span><span className="navbar-profile-pic-text">Signed in:&nbsp;&nbsp;</span><img src={profilePic} alt="profile" className="navbar-profile-pic"></img></span>} className="user-dropdown" alignRight>
            <NavDropdown.Item onClick={showAddRecipeModal}>Add Recipe</NavDropdown.Item>
            <NavDropdown.Item onClick={showUpdateRecipesModal}>Update Recipes</NavDropdown.Item>
            <NavDropdown.Item onClick={showUpdateTasksAndLocationsModal}>Update Tasks and Locations</NavDropdown.Item>
            <NavDropdown.Item >More Preferences</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleSignOut} >Sign Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

// Represents the Login "page"
function Login(props) {
  return (
    <section className="login-page mx-3">
      <img src="img/favicon-no-shadow.png" alt="app-icon" className="login-logo" title="Bakery by Goran Babic from Iconfinder"/>
      <header>
        <h1 className="mt-3">
          Welcome to BakeTime!
        </h1>
        <p>
          A personalized set of timers for all your baking needs!
        </p>
      </header>

      <div className="container">
        <div className="row login-images">
          <img src="img/cookies.jpg" alt="cookies" />
          <img src="img/chocolate-cake.jpg" alt="chocolate cake" />
          <img src="img/croissant.jpg" alt="crossiants" />
        </div>
      </div>

      <header>
        <h2 className="mt-5">Sign Up or Log In:</h2>
      </header>
      {/* A sign in form */}
      <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={firebase.auth()} />
    </section>
  );
}

// Represents the Dashboard "page"
function Dashboard(props) {
  const {user, timerList, setTimerList, recipes, taskList, totalTime, totalDays, totalBakes, setTotalTime, setTotalBakes} = props;

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
                Welcome to Your Dashboard, {user.displayName}!
              </h1>
              <p>Your current tasks are listed below:</p>
            </div>
            <TimerTable recipes={recipes} taskList={taskList} timerList={timerList} handleRemove={handleRemove} recipeCallback={clickedOnRecipe} showModal={showModal} />
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
