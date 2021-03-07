import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import App from './App';

ReactDOM.render(<BrowserRouter> <App /> </BrowserRouter>, document.getElementById('root'));

// TODO:
// - HIGH PRIORITY
//      [x] Fetch external data
//      [x] Add recipe modal (see line 220 in App.js)
//      [x] For Kerri: modularize everything!!
//          - I tried my best
//      [ ] For Kerri: Add props comments to aid readability
//      [x] For Annie: use imported data and props for Recipes.js
// - MEDIUM PRIORITY
//      [X] Add a delete timer option?
//          - Two options to pick from: added to recipe modal and click on timer modal
// - LOW PRIORITY
//      [ ] Get recipe search working (will do this for the final)
//      [x] Add recipe modal to recipe card
//      [ ] Add more icons for tasks
