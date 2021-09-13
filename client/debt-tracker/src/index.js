import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
//Pages
import Total from './pages/Total';
import AddTransaction from './pages/AddTransaction';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Switch>
      <Route exact path='/'>
        <Redirect to='/all-transactions'/>
      </Route>
      <Route path='/all-transactions'>
        <Total/>
      </Route>
      <Route path='/add-transaction'>
        <AddTransaction/>
      </Route>
    </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
