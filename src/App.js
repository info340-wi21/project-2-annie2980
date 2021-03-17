import React, { useState, useEffect } from 'react';
import {Route, Switch, Redirect, NavLink} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Row, Col, Alert } from 'react-bootstrap';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'whatwg-fetch';
import RecipeList from './Recipes';
import About from './About';
import { AddTimer } from './AddTimerDash';
import { StatsTable } from './StatsTable';
import { TimerRecipeModal } from './Modals';
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
  const [timerList, setTimerList] = useState([]);

  const [recipes, setRecipes] = useState([]);
  const [taskList, setTaskList] = useState([]);

  // State for statistics table - will need to fetch later?
  const [totalTime, setTotalTime] = useState(40); // in seconds
  const [totalDays, setTotalDays] = useState(4);
  const [totalBakes, setTotalBakes] = useState(2);

  // Auth state event listener
  useEffect(() => {
    // runs after component loads
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // logged in
        setUser(firebaseUser);
        
        // Reference to the user in the database
        let userRef = firebase.database().ref(firebaseUser.uid);
        // Grab a snapshot of this location - if it's not defined, populate database for new user
        // Then re-grab the reference to the user
        userRef.get().then((snapshot) => {
          if (!snapshot.exists()) {
            console.log("Adding user to database");
            userRef.set(generateDefaultUserInfo(firebaseUser));
            userRef = firebase.database().ref(firebaseUser.uid);
          }
        }).catch(function(error) {
          console.error(error);
        }).then(() => {
          // Now, set the state for everything
          const statsRef = userRef.child('stats');
          const timersRef = userRef.child('timerList');

          // Set stats to what it is in the database
          statsRef.on('value', (snapshot) => {
            const theStatsObj = snapshot.val();
            setTotalTime(theStatsObj.totalTime);
            setTotalBakes(theStatsObj.totalBakes);
            let msDiff = new Date().getTime() - new Date(theStatsObj.accountCreated).getTime();
            let timeDiff = msDiff / (1000 * 3600 * 24)
            setTotalDays(Math.ceil(timeDiff));
          })

          // Set timers to what it is in the database
          timersRef.on('value', (snapshot) => {
            const timerArr = snapshot.val();
            if (timerArr === null) {
              setTimerList([]);
            } else {
              timerArr.forEach((obj) => {
                obj.endTime = new Date(obj.endTime);
              });
              setTimerList(timerArr);
            }
          })
        });

        setIsLoading(false);
      } else {
        // logged out
        setUser(null);
        setIsLoading(false);
      }
    });

    return function cleanup() {
      authUnregisterFunction();
    }
  }, []);

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
          <NavigationBar user={user} handleSignOut={handleSignOut} />
        </header>

        <main>
          <div>
            <Switch>
              <Route exact path="/"> <Dashboard user={user} timerList={timerList} recipes={recipes} taskList={taskList} totalTime={totalTime} totalDays={totalDays} totalBakes={totalBakes} /> </Route>
              <Route path="/recipes"> <RecipeList recipes={recipes}/> </Route>
              <Route path="/about"> <About /> </Route>
              <Redirect to="/" />
            </Switch>
          </div>
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

// Function that returns an object representing the initial state for a new user!
// Ideas:
//  - Should we grab the initial recipes in recipes.json and stick them here? Same with tasks.json?
function generateDefaultUserInfo(user) {
  return {
    displayName: user.displayName,
    timerList: {
      // for reference
      // 0: {recipeIndex: 1, item: "Pumpkin Pie", task: "Second Baking", location: "Top Oven", endTime: getEndTime(0, 0, 10).getTime()}
    },
    stats: {
      totalTime: 0,
      accountCreated: firebase.database.ServerValue.TIMESTAMP,
      totalBakes: 0
    }
  }
};

function NavigationBar(props) {
  const {user, handleSignOut} = props;

  let profilePic = "img/blank-profile-picture-pixabay.png";
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
          <NavDropdown id="user-options" title={<span><span className="navbar-profile-name">My Options</span><span className="navbar-profile-pic-text">Signed in as {user.displayName}&nbsp;&nbsp;</span><img src={profilePic} alt="profile" className="navbar-profile-pic"></img></span>} className="user-dropdown" alignRight>
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
          <img src="img/chocolate-cake-pixabay.jpg" alt="chocolate cake" />
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

    // just in case, sort the array before rendering
    timerCopy.sort((a, b) => a.endTime - b.endTime);

    // convert date objects to ms
    timerCopy.forEach((obj) => {
      obj.endTime = obj.endTime.getTime();
    })

    // update state
    // setTimerList(timerCopy);

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
    // setTotalTime(totalTime + getSeconds(newTimer.hr, newTimer.min, newTimer.sec));
    // if (newTimer.taskName.includes("Baking")) {
    //     setTotalBakes(totalBakes + 1);
    // }

    // Push stats to database
    const userRef = firebase.database().ref(user.uid + "/stats");
    userRef.child("totalTime").set(totalTime + getSeconds(newTimer.hr, newTimer.min, newTimer.sec));
    if (newTimer.taskName.includes("Baking")) {
      userRef.child("totalBakes").set(totalBakes + 1);
    }

    // Add timer to list and clear state
    timerCopy.push(timerToAdd);

    // just in case, sort the array before rendering
    timerCopy.sort((a, b) => a.endTime - b.endTime);

    // convert date objects to ms
    timerCopy.forEach((obj) => {
      obj.endTime = obj.endTime.getTime();
    });

    // update state
    // setTimerList(timerCopy);

    // Push new timerList to database
    const timerListRef = firebase.database().ref(user.uid + "/timerList");
    timerListRef.set(timerCopy);
  };

  return (
    <div>
      <Container className="main-container" fluid>
        {/* <!-- Button to Add Timer --> */}
        <Row>
          <Alert variant="info" className="add-timer-alert w-100" role="alert">
            <span className="add-timer-text">Click to Add a New Timer:</span>
            <a className="btn ml-3" href="#add-timer">Add Timer</a>
          </Alert>
        </Row>

        <Row>
          {/* <!-- Timer Table --> */}
          <Col as="section" sm={12} lg={8} xl={9} className="mt-3">
            <Container fluid>
              <h1>
                Welcome to Your Dashboard, {user.displayName}!
              </h1>
              <p>Your current tasks are listed below:</p>
            </Container>
            <TimerTable recipes={recipes} taskList={taskList} timerList={timerList} handleRemove={handleRemove} recipeCallback={clickedOnRecipe} showModal={showModal} />
            <Container fluid>
              <p className="tap-more">Tap on the item to see more information!</p>
              <p className="click-more">Click on the item to see more information!</p>
            </Container>
          </Col>

          {/* <!-- Add Timer --> */}
          <Col as="section" sm={12} lg={4} xl={3} id="add-timer" className="add-timer mt-3">
            <AddTimer recipes={recipes} taskList={taskList} handleAdd={handleAdd} />
          </Col>

          {/* <!-- Statistics Table --> */}
          <Col as="section" sm={12} lg={8} xl={9} className="mt-3 mb-5">
            <StatsTable totalTime={totalTime} totalDays={totalDays} totalBakes={totalBakes} />
          </Col>
        </Row>
      </Container>
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
