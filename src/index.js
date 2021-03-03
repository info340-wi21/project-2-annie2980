import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './style.css';
import App from './App';

ReactDOM.render(<BrowserRouter> <App /> </BrowserRouter>, document.getElementById('root'));

// TODO:
// - ISSUES FROM MIGRATING TO REACT
//      [x] Nav bar needs to show active link (using NavLink is really ugly which is why I changed it to Link)
//          - I changed it to NavLink and it seems fine?
//      [x] Nav bar spacing is slightly different now (less space between the icon and 'BakeTime')
//          - Changed it - there's now a little more space
//      [x] Fix the copyright year (it gets weird when I put {} in <script>)
// - HIGH PRIORITY
//      [x] Fetch external data
// - MEDIUM PRIORITY
//      [ ] Add a delete timer option?
//          - What would be the interaction? Right-click on the row and then a modal pops up?
// - LOW PRIORITY
//      [ ] Get recipe search working or get rid of search input and button
//      [ ] Add images to the recipe modal (will need to add file location in json file?) <- yeah probably
//      [ ] Add more icons for tasks
