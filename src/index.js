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
//      [ ] For Kerri: modularize everything!!
//      [ ] For Annie: use imported data and props for Recipes.js
// - MEDIUM PRIORITY
//      [ ] Add a delete timer option?
//          - What would be the interaction? Right-click on the row and then a modal pops up?
// - LOW PRIORITY
//      [ ] Get recipe search working or get rid of search input and button
//      [ ] Add images to the recipe modal (will need to add file location in json file?) <- yeah probably
//      [ ] Add more icons for tasks
