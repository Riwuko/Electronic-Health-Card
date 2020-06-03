import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

//Pages
import MainPage from "./pages";

export default class App extends Component{


  render(){
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={MainPage} />
        </Switch>
    </Router>
  );
  }
}


