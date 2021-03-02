import React from 'react';

function About() {
  return (
    <div class="container">
      {/* <!-- About this project --> */}
      <AboutApp />

      {/* <!-- About the Developers --> */}
      <AboutDevelopers />

      {/* <!-- Sources and Acknowledgements --> */}
      <Acknowledgements />
    </div>
  );
}

function AboutApp() {
  return (
    <section class="mb-5 mt-4 about-section">
      <header>
        <h1>About BakeTime</h1>
      </header>
      <div class="row">
        <div class="col-xs-12 col-lg-8 align-self-center">
          <div class="mt-1">
            <div class="subtitle mb-2">
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
        </div>
        <div class="col-xs-12 col-lg-4 align-self-center">
          <div class="about-image">
            <img class="card-img-top" src="img/chocolate-cake.jpg" alt="a chocolate cake"/>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutDevelopers() {
  return (
    <section class="my-5 about-section">
      <header>
        <h1>About the Developers</h1>
      </header>
      <div class="mt-2">
        <div class="subtitle mb-2">
          We like cake!
        </div>
        <div class="container">
          <div class="row text-center">
            <div class="col-xs-12 col-md-6">
              {/* <!-- Annie info --> */}
              <div class="profile-pic my-3">
                <img class="card-img-top" src="img/Annie.jpg" alt="Annie Liu"/>
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
            </div>

            <div class="col-xs-12 col-md-6">
              {/* <!-- Kerri info --> */}
              <div class="profile-pic my-3">
                <img class="card-img-top" src="img/Kerri.jpeg" alt="Kerri Lee"/>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Acknowledgements() {
  return (
    <section class="my-5 about-section">
      <header>
        <h1>Sources and Acknowledgements</h1>
      </header>
      <div class="mt-2 mb-4">
        <p>
          This project was created for the course INFO340: Client-Side Development, at the University of Washington.
        </p>
      </div>
      <div>
        <div class="subtitle mb-2">
          Images and Icons
        </div>
        <a href="https://www.iconfinder.com/icons/877020/bakery_cafe_eshop_market_shop_store_icon" target="_blank">Bakery</a> by <a href="https://www.iconfinder.com/Bres" target="_blank">Goran Babic</a> from Iconfinder is licensed under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>
        <br/>
        <a href="https://thenounproject.com/term/oven/1114693/" target="_blank">Oven</a> by <a href="https://thenounproject.com/llisole" target="_blank">Llisole</a> from the Noun Project is licensed under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>
        <br/>
        <a href="https://thenounproject.com/term/fridge/564397/" target="_blank">Fridge</a> by <a href="https://thenounproject.com/ralfschmitzer" target="_blank">Ralf Schmitzer</a> from the Noun Project is licensed under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>
        <br/>
        <a href="https://thenounproject.com/term/baked-buns/1114695/" target="_blank">Baked Buns</a> by <a href="https://thenounproject.com/llisole" target="_blank">Llisole</a> from the Noun Project is licensed under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>
      </div>
      <div class="mt-3">
        <h2 class="subtitle">
          Code
        </h2>
        Timer code adapted from SitePoint's <a href="https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/" target="_blank">Build A Countdown Timer</a> by Yaphi Berhanu and Nilson Jacques
      </div>
    </section>
  );
}

export default About;