import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './style.css';
import App from './App';

ReactDOM.render(<BrowserRouter> <App /> </BrowserRouter>, document.getElementById('root'));

// TODO:
// - ISSUES FROM MIGRATING TO REACT
//      [ ] Nav bar needs to show active link (using NavLink is really ugly which is why I changed it to Link)
//      [ ] Fix the copyright year (it gets weird when I put {} in <script>)
// - HIGH PRIORITY
//      [ ] Fetch external data
// - MEDIUM PRIORITY
//      [ ] Add a delete timer option?
// - LOW PRIORITY
//      [ ] Get recipe search working or get rid of search input and button
//      [ ] Add images to the recipe modal (will need to add file location in json file?)
//      [ ] Add more icons for tasks
