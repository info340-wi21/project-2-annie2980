import React, { useState } from 'react';
import { Card, Col, Form } from 'react-bootstrap';

export function AddRecipeForm() {
  return (
    <Card className="form-card">
      <Form as="container-fluid">
        {/* Recipe Information */}
        <Col className="ml-0 pl-1">
          <p className="form-subheader">Enter Recipe Information:</p>
        </Col>
        {/* Recipe Name */}
        <Col xs={12} className="mb-3 px-0">
          <Form.Control as="input" type="text" placeholder="Enter Recipe Name" aria-label="enter recipe name" required />
        </Col>
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
        <Col xs={12} className="ml-0 pl-1">
          <p className="form-subheader">Enter Step Information:</p>
        </Col>
        <Col xs={12} className="mb-3 px-0">
          <Form.Control as="select" aria-label="select task" required>
            <option value="" defaultValue>Pick a Task...</option>
          </Form.Control>
        </Col>
        <Col xs={12} className="mb-3 mr-2 px-0">
          <Form.Control as="input" type="text" placeholder="Enter Task Description" aria-label="enter task description"required />
        </Col>
        <Col xs={12} className="ml-0 mb-2 pl-1">
          Enter Task Time:
        </Col>
        {/* <Col className="mb-3 px-0">
          <input type="text" className="form-control" placeholder="Hours:Minutes:Seconds" aria-label="enter task time"></input>
        </Col> */}
        {/* THIS DIVIDES TIME INPUT INTO THREE TEXT BOXES */}
        <Form.Group className="col-sm-12 mt-2 px-0 form-inline" role="time imput">
          <Col xs={6} className="pl-0 pr-2">
            <Form.Control as="input" type="number" id="stp-hr" min="0" max="48" className="w-100" aria-label="enter hours" required />
            <Form.Label htmlFor="stp-hr" className="w-100">hr</Form.Label>
          </Col>
          <Col xs={6} className="pr-0 pl-2">
            <Form.Control as="input" type="number" id="stp-min" min="0" max="59" className="w-100" aria-label="enter minutes" required />
            <Form.Label htmlFor="stp-min" className="w-100">min</Form.Label>
          </Col>
        </Form.Group>
        <Col className="mb-3 px-0">
          <button className="btn add-step-btn">Add Step</button>
        </Col>
        {/* CHOOSE BETWEEN HAVING THE STUFF AT THE END HERE OR UNDER RECIPE INFORMATION */}
        {/* Prep Time */}
        <Col className="ml-0 pl-1">
          <p className="form-subheader">Enter Prep Time:</p>
        </Col>
        <Form.Group className="col-sm-12 mt-2 px-0 form-inline" role="time imput">
          <Col xs={6} className="pl-0 pr-2">
            <Form.Control as="input" type="number" id="prep-hr" min="0" max="48" className="w-100" aria-label="enter hours" required />
            <Form.Label htmlFor="prep-hr" className="w-100">hr</Form.Label>
          </Col>
          <Col xs={6} className="pr-0 pl-2">
            <Form.Control as="input" type="number" id="prep-min" min="0" max="59" className="w-100" aria-label="enter minutes" required />
            <Form.Label htmlFor="prep-min" className="w-100">min</Form.Label>
          </Col>
        </Form.Group>
        {/* Cook Time */}
        <Col className="ml-0 pl-1">
          <p className="form-subheader">Enter Cook Time:</p>
        </Col>
        <Form.Group className="col-sm-12 mt-2 px-0 form-inline" role="time imput">
          <Col xs={6} className="pl-0 pr-2">
            <Form.Control as="input" type="number" id="cook-hr" min="0" max="48" className="w-100" aria-label="enter hours" required />
            <Form.Label htmlFor="cook-hr" className="w-100">hr</Form.Label>
          </Col>
          <Col xs={6} className="pr-0 pl-2">
            <Form.Control as="input" type="number" id="cook-min" min="0" max="59" className="w-100" aria-label="enter minutes" required />
            <Form.Label htmlFor="cook-min" className="w-100">min</Form.Label>
          </Col>
        </Form.Group>
        {/* Total Time */}
        <Col className="ml-0 pl-1">
          <p className="form-subheader">Enter Total Time:</p>
        </Col>
        <Form.Group className="col-sm-12 mt-2 px-0 form-inline" role="time imput">
          <Col xs={6} className="pl-0 pr-2">
            <Form.Control as="input" type="number" id="tot-hr" min="0" max="48" className="w-100" aria-label="enter hours" required />
            <Form.Label htmlFor="tot-hr" className="w-100">hr</Form.Label>
          </Col>
          <Col xs={6} className="pr-0 pl-2">
            <Form.Control as="input" type="number" id="tot-min" min="0" max="59" className="w-100" aria-label="enter minutes" required />
            <Form.Label htmlFor="tot-min" className="w-100">min</Form.Label>
          </Col>
        </Form.Group>
        {/* FIGURE OUT HOW TO DO IMAGE UPLOAD TO A FOLDER */}
        {/* Upload Image */}
        {/* <div className="col-12 ml-0 pl-1">
          <p className="form-subheader">Enter Image File Name:</p>
        </div>
        <div className="col-12 mb-3 px-0">
          <input type="text" className="form-control" placeholder="" aria-label="enter task name"></input>
        </div> */}
        <Col className="mb-3 px-0">
          <button className="btn" type="submit">Add Recipe</button>
        </Col>
      </Form>
    </Card>
  );
}