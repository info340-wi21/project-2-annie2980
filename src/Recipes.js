import React from 'react';

function RecipeList() {
  return (
    <div className="container-fluid">
      {/* <!-- Recipe Cards --> */}
      <div className="row">
        <div className="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 1 --> */}
          <div className="card mt-4">
            <div className="card-body">
              <div className="row">
                <div>
                  <img className="card-img-top" src="img/apple-pie.jpg" alt="a slice of apple pie"/>
                </div>
                <div className="col">
                  <h1 className="card-title">Apple Pie</h1>
                  <p className="card-text">Total Time: 1 Hour 5 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 2 --> */}
          <div className="card mt-4">
            <div className="card-body">
              <div className="row">
                <div>
                  <img className="card-img-top" src="img/blueberry-scones.jpg" alt="blueberry scones"/>
                </div>
                <div className="col">
                  <h1 className="card-title">Blueberry Scones</h1>
                  <p className="card-text">Total Time: 55 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 3 --> */}
          <div className="card mt-4">
            <div className="card-body">
              <div className="row">
                <div>
                  <img className="card-img-top" src="img/chocolate-cake.jpg" alt="a chocolate cake"/>
                </div>
                <div className="col">
                  <h1 className="card-title">Chocolate Cake</h1>
                  <p className="card-text">Total Time: 45 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 4 --> */}
          <div className="card mt-4">
            <div className="card-body">
              <div className="row">
                <div>
                  <img className="card-img-top" src="img/cookies.jpg" alt="chocolate chip cookies"/>
                </div>
                <div className="col">
                  <h1 className="card-title">Chocolate Chip Cookies</h1>
                  <p className="card-text">Total Time: 18 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 5 --> */}
          <div className="card mt-4">
            <div className="card-body">
              <div className="row">
                <div>
                  <img className="card-img-top" src="img/croissant.jpg" alt="a croissant"/>
                </div>
                <div className="col">
                  <h1 className="card-title">Croissants</h1>
                  <p className="card-text">Total Time: 11 Hours 50 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 6 --> */}
          <div className="card mt-4">
            <div className="card-body">
              <div className="row">
                <div>
                  <img className="card-img-top" src="img/cupcakes.jpg" alt="cupcakes"/>
                </div>
                <div className="col">
                  <h1 className="card-title">Cupcakes</h1>
                  <p className="card-text">Total Time: 33 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 7 --> */}
          <div className="card mt-4">
            <div className="card-body">
              <div className="row">
                <div>
                  <img className="card-img-top" src="img/pink-macarons.jpg" alt="macarons"/>
                </div>
                <div className="col">
                  <h1 className="card-title">Macarons</h1>
                  <p className="card-text">Total Time: 1 Hour 47 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 col-xl-3 d-flex">
          {/* <!-- Card 8 --> */}
          <div className="card mt-4">
            <div className="card-body">
              <div className="row">
                <div>
                  <img className="card-img-top" src="img/pumpkin-pie.jpg" alt="a slice of pumpkin pie"/>
                </div>
                <div className="col">
                  <h1 className="card-title">Pumpkin Pie</h1>
                  <p className="card-text">Total Time: 1 Hour 10 Minutes</p>
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