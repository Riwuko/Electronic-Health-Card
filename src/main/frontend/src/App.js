import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import PatientsList from './components/PatientsList';


export default class App extends Component{


  render(){
  return (
    <div className="container">
      
      <PatientsList />
      
    </div>
  );
  }
}


