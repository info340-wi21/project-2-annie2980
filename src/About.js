import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

function About() {
  return (
    <Container>
      {/* <!-- About this project --> */}
      <AboutApp />

      {/* <!-- About the Developers --> */}
      <AboutDevelopers />

      {/* <!-- Sources and Acknowledgements --> */}
      <Acknowledgements />
    </Container>
  );
}

function AboutApp() {
  return (
    <section className="mb-5 mt-4 about-section">
      <header>
        <h1>About BakeTime</h1>
      </header>
      <Row>
        <Col xs={12} lg={8} className="align-self-center">
          <div className="mt-1">
            <div className="subtitle mb-2">
              As frequent bakers...
            </div>
            <p>
              We noticed that keeping track of tasks that are happening at the same time, especially those that are time-related, can be hard to coordinate in a centralized location. Home bakers, for example, might have to juggle several time-related tasks (e.g., different steps in multiple recipes), each with its own nuances. Even for experienced bakers, it can be hard to remember which tasks take certain amounts of time or which timer is tied to a certain task. Thus, it often falls on web or mobile apps to help the user keep track of the time and/or which step of the recipe they are on.
            </p>
            <p>
              We wanted to design a more specialized baking timer web app that could be easier to use for our particular purposes, such as having multiple timers each with its own designation.
            </p>
            <p>
              <em>Whether you're an amateur or professional baker, we want to help you achieve a stress-free baking experience!</em>
            </p>
          </div>
        </Col>
        <Col xs={12} lg={4} className="align-self-center">
          <div className="about-image">
            <img className="card-img-top" src="img/chocolate-cake-pixabay.jpg" alt="a chocolate cake"/>
          </div>
        </Col>
      </Row>
    </section>
  );
}

function AboutDevelopers() {
  return (
    <section className="my-5 about-section">
      <header>
        <h1>About the Developers</h1>
      </header>
      <div className="mt-2">
        <div className="subtitle mb-2">
          We like cake!
        </div>
        <Container>
          <Row className="text-center">
            <Col xs={12} md={6}>
              {/* <!-- Annie info --> */}
              <div className="profile-pic my-3">
                <Card.Img variant="top" src="img/Annie.jpg" alt="Annie Liu"/>
              </div>
              <header>
                <h2>
                  Annie Liu
                </h2>
              </header>
              <p>
                Year: Junior <br/>
                Major: Informatics, Psychology
              </p>
            </Col>

            <Col xs={12} md={6}>
              {/* <!-- Kerri info --> */}
              <div className="profile-pic my-3">
                <Card.Img variant="top" src="img/Kerri.jpeg" alt="Kerri Lee"/>
              </div>
              <header>
                <h2>
                  Kerri Lee
                </h2>
              </header>
              <p>
                Year: Junior <br/>
                Major: Computer Science
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}

function Acknowledgements() {
  return (
    <section className="my-5 about-section">
      <header>
        <h1>Sources and Acknowledgements</h1>
      </header>
      <div className="mt-2 mb-4">
        <p>
          This project was created for the course INFO340: Client-Side Development, at the University of Washington.
        </p>
      </div>
      <div>
        <div className="subtitle mb-2">
          Images and Icons
        </div>
        <a href="https://www.iconfinder.com/icons/877020/bakery_cafe_eshop_market_shop_store_icon" rel="noreferrer" target="_blank">Bakery</a> by <a href="https://www.iconfinder.com/Bres" rel="noreferrer" target="_blank">Goran Babic</a> from Iconfinder is licensed under <a href="https://creativecommons.org/licenses/by/3.0/" rel="noreferrer" target="_blank">CC BY 3.0</a>
        <br/>
        <a href="https://thenounproject.com/term/oven/1114693/" rel="noreferrer" target="_blank">Oven</a> by <a href="https://thenounproject.com/llisole" rel="noreferrer" target="_blank">Llisole</a> from the Noun Project is licensed under <a href="https://creativecommons.org/licenses/by/3.0/" rel="noreferrer" target="_blank">CC BY 3.0</a>
        <br/>
        <a href="https://thenounproject.com/term/fridge/564397/" rel="noreferrer" target="_blank">Fridge</a> by <a href="https://thenounproject.com/ralfschmitzer" rel="noreferrer" target="_blank">Ralf Schmitzer</a> from the Noun Project is licensed under <a href="https://creativecommons.org/licenses/by/3.0/" rel="noreferrer" target="_blank">CC BY 3.0</a>
        <br/>
        <a href="https://thenounproject.com/term/baked-buns/1114695/" rel="noreferrer" target="_blank">Baked Buns</a> by <a href="https://thenounproject.com/llisole" rel="noreferrer" target="_blank">Llisole</a> from the Noun Project is licensed under <a href="https://creativecommons.org/licenses/by/3.0/" rel="noreferrer" target="_blank">CC BY 3.0</a>
      </div>
      <div className="mt-3">
        <h2 className="subtitle">
          Code
        </h2>
        Timer code adapted from SitePoint's <a href="https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/" rel="noreferrer" target="_blank">Build A Countdown Timer</a> by Yaphi Berhanu and Nilson Jacques
        <br/>
        Custom React timer hook library: <a href="https://www.npmjs.com/package/react-timer-hook" rel="noreferrer" target="_blank">react-timer-hook</a>
      </div>
    </section>
  );
}

export default About;