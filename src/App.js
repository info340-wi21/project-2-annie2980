import React, { useState, useEffect } from 'react';
import {Route, Switch, Redirect, NavLink} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'whatwg-fetch';
import RecipeList from './Recipes';
import About from './About';
import Dashboard from './Dashboard';
import Login from './Login';

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
              <Route path="/recipes"> <RecipeList recipes={recipes} /> </Route>
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
      <Container fluid as="footer" className="my-3">
        {/* <!-- Copyright --> */}
        <div className="copyright">
          <p>
            <a href="https://github.com/info340-wi21/project-2-annie2980" rel="noreferrer" target="_blank">GitHub Repo</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="http://www.washington.edu" rel="noreferrer" target="_blank">University of Washington</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            &copy; {new Date().getFullYear()} Annie Liu and Kerri Lee
          </p>
        </div>
      </Container>
    </div>
  );
}

// Function that returns an object representing the initial state for a new user!
// for reference
// 0: {recipeIndex: 1, item: "Pumpkin Pie", task: "Second Baking", location: "Top Oven", endTime: getEndTime(0, 0, 10).getTime()}
function generateDefaultUserInfo(user) {
  return {
    displayName: user.displayName,
    stats: {
      totalTime: 0,
      accountCreated: new Date().getTime(),
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
          <NavDropdown id="user-options" title={<span><span className="navbar-profile-name">My Options</span><span className="navbar-profile-pic-text">Signed in as {user.displayName}&nbsp;&nbsp;</span><Image src={profilePic} alt="profile" className="navbar-profile-pic" roundedCircle /></span>} className="user-dropdown" alignRight>
            <NavDropdown.Item onClick={handleSignOut} >Sign Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default App;
