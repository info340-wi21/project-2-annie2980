import React, { useState } from 'react';

export function AddRecipeForm() {
  return (
    <div className="card form-card">
      <form className="container-fluid">
        <div className="row align-items-center">
          {/* Recipe Information */}
          <div className="col-12 ml-0 pl-1">
            <p className="form-subheader">Enter Recipe Information:</p>
          </div>
          {/* Recipe Name */}
          <div className="col-12 mb-3 px-0">
            <input type="text" className="form-control" placeholder="Enter Recipe Name" aria-label="enter recipe name"></input>
          </div>
          {/* Prep Time */}
          {/* <div className="col-12 ml-0 mb-2 pl-1">
            Enter Prep Time:
          </div>
          <div className="col-12 mb-3 px-0">
            <input type="text" className="form-control" placeholder="Hours:Minutes:Seconds" aria-label="enter prep time"></input>
          </div> */}
          {/* Cook Time */}
          {/* <div className="col-12 ml-0 mb-2 pl-1">
            Enter Cook Time:
          </div>
          <div className="col-12 mb-3 px-0">
            <input type="text" className="form-control" placeholder="Hours:Minutes:Seconds" aria-label="enter cook time"></input>
          </div> */}
          {/* Total Time */}
          {/* <div className="col-12 ml-0 mb-2 pl-1">
            Enter Total Time:
          </div>
          <div className="col-12 mb-3 px-0">
            <input type="text" className="form-control" placeholder="Hours:Minutes:Seconds" aria-label="enter total time"></input>
          </div> */}
          {/* Step Information */}
          <div className="col-12 ml-0 pl-1">
            <p className="form-subheader">Enter Step Information:</p>
          </div>
          <div className="col-12 mb-3 px-0">
            <input type="text" className="form-control" placeholder="Enter Task Name" aria-label="enter task name"></input>
          </div>
          <div className="col-12 mb-3 mr-2 px-0">
            <input type="text" className="form-control" placeholder="Enter Task Description" aria-label="enter task description"></input>
          </div>
          <div className="col-12 ml-0 mb-2 pl-1">
            Enter Task Time:
          </div>
          <div className="col-12 mb-3 px-0">
            <input type="text" className="form-control" placeholder="Hours:Minutes:Seconds" aria-label="enter task time"></input>
          </div>
          {/* THIS DIVIDES TIME INPUT INTO THREE TEXT BOXES */}
          {/* <div className="col-4 mb-3 pl-0 pr-2 d-line">
            <input type="text" className="form-control" placeholder="Enter Hours" aria-label="enter hours"></input>
          </div>
          <div className="col-4 mb-3 px-2 d-line">
            <input type="text" className="form-control" placeholder="Enter Minutes" aria-label="enter minutes"></input>
          </div>
          <div className="col-4 mb-3 pr-0 pl-2 d-line">
            <input type="text" className="form-control" placeholder="Enter Seconds" aria-label="enter seconds"></input>
          </div> */}
          <div className="col mb-3 px-0">
            <button className="btn add-step-btn">Add Step</button>
          </div>
          {/* CHOOSE BETWEEN HAVING THE STUFF AT THE END HERE OR UNDER RECIPE INFORMATION */}
          {/* Prep Time */}
          <div className="col-12 ml-0 pl-1">
            <p className="form-subheader">Enter Prep Time:</p>
          </div>
          <div className="col-12 mb-3 px-0">
            <input type="text" className="form-control" placeholder="Hours:Minutes:Seconds" aria-label="enter prep time"></input>
          </div>
          {/* Cook Time */}
          <div className="col-12 ml-0 pl-1">
            <p className="form-subheader">Enter Cook Time:</p>
          </div>
          <div className="col-12 mb-3 px-0">
            <input type="text" className="form-control" placeholder="Hours:Minutes:Seconds" aria-label="enter cook time"></input>
          </div>
          {/* Total Time */}
          <div className="col-12 ml-0 pl-1">
            <p className="form-subheader">Enter Total Time:</p>
          </div>
          <div className="col-12 mb-3 px-0">
            <input type="text" className="form-control" placeholder="Hours:Minutes:Seconds" aria-label="enter total time"></input>
          </div>
          {/* FIGURE OUT HOW TO DO IMAGE UPLOAD TO A FOLDER */}
          {/* Upload Image */}
          {/* <div className="col-12 ml-0 pl-1">
            <p className="form-subheader">Enter Image File Name:</p>
          </div>
          <div className="col-12 mb-3 px-0">
            <input type="text" className="form-control" placeholder="" aria-label="enter task name"></input>
          </div> */}
          <div className="col mb-3 px-0">
            <button className="btn">Add Recipe</button>
          </div>
        </div>
      </form>
    </div>
  );
}