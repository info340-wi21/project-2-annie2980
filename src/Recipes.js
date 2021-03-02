import React from 'react';

function RecipeList() {
  return (
    <div class="container-fluid">
      {/* <!-- Recipe Cards --> */}
      <div class="row">
        <div class="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 1 --> */}
          <div class="card mt-4">
            <div class="card-body">
              <div class="row">
                <div>
                  <img class="card-img-top" src="img/apple-pie.jpg" alt="a slice of apple pie"/>
                </div>
                <div class="col">
                  <h1 class="card-title">Apple Pie</h1>
                  <p class="card-text">Total Time: 1 Hour 5 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 2 --> */}
          <div class="card mt-4">
            <div class="card-body">
              <div class="row">
                <div>
                  <img class="card-img-top" src="img/blueberry-scones.jpg" alt="blueberry scones"/>
                </div>
                <div class="col">
                  <h1 class="card-title">Blueberry Scones</h1>
                  <p class="card-text">Total Time: 55 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 3 --> */}
          <div class="card mt-4">
            <div class="card-body">
              <div class="row">
                <div>
                  <img class="card-img-top" src="img/chocolate-cake.jpg" alt="a chocolate cake"/>
                </div>
                <div class="col">
                  <h1 class="card-title">Chocolate Cake</h1>
                  <p class="card-text">Total Time: 45 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 4 --> */}
          <div class="card mt-4">
            <div class="card-body">
              <div class="row">
                <div>
                  <img class="card-img-top" src="img/cookies.jpg" alt="chocolate chip cookies"/>
                </div>
                <div class="col">
                  <h1 class="card-title">Chocolate Chip Cookies</h1>
                  <p class="card-text">Total Time: 18 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 5 --> */}
          <div class="card mt-4">
            <div class="card-body">
              <div class="row">
                <div>
                  <img class="card-img-top" src="img/croissant.jpg" alt="a croissant"/>
                </div>
                <div class="col">
                  <h1 class="card-title">Croissants</h1>
                  <p class="card-text">Total Time: 11 Hours 50 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 6 --> */}
          <div class="card mt-4">
            <div class="card-body">
              <div class="row">
                <div>
                  <img class="card-img-top" src="img/cupcakes.jpg" alt="cupcakes"/>
                </div>
                <div class="col">
                  <h1 class="card-title">Cupcakes</h1>
                  <p class="card-text">Total Time: 33 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 7 --> */}
          <div class="card mt-4">
            <div class="card-body">
              <div class="row">
                <div>
                  <img class="card-img-top" src="img/pink-macarons.jpg" alt="macarons"/>
                </div>
                <div class="col">
                  <h1 class="card-title">Macarons</h1>
                  <p class="card-text">Total Time: 1 Hour 47 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 8 --> */}
          <div class="card mt-4">
            <div class="card-body">
              <div class="row">
                <div>
                  <img class="card-img-top" src="img/pumpkin-pie.jpg" alt="a slice of pumpkin pie"/>
                </div>
                <div class="col">
                  <h1 class="card-title">Pumpkin Pie</h1>
                  <p class="card-text">Total Time: 1 Hour 10 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RecipeList;