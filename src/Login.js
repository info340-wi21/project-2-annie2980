import { Container, Image, Row } from 'react-bootstrap';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Represents the Login "page"
function Login(props) {
  /*
    Props:
    - uiConfig: configuration object for FirebaseUI
  */
  return (
    <section className="login-page mx-3">
      <Image src="img/favicon-no-shadow.png" alt="app-icon" className="login-logo" title="Bakery by Goran Babic from Iconfinder"/>
      <header>
        <h1 className="mt-3">
          Welcome to BakeTime!
        </h1>
        <p>
          A personalized set of timers for all your baking needs!
        </p>
      </header>

      <Container>
        <Row className="login-images">
          <Image src="img/cookies.jpg" alt="cookies" />
          <Image src="img/chocolate-cake-pixabay.jpg" alt="chocolate cake" />
          <Image src="img/croissant.jpg" alt="crossiants" />
        </Row>
      </Container>

      <header>
        <h2 className="mt-5">Sign Up or Log In:</h2>
      </header>
      {/* A sign in form */}
      <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={firebase.auth()} />
    </section>
  );
}

export default Login;
