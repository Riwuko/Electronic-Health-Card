import React, {Component} from 'react';
import './App.css';
import { Route, Switch } from 'react-router';

//components
import PatientsList from "./components/PatientsList";
import PatientDetail from './components/PatientDetail';
import MedicationRequestDetail from './components/MedicationRequestDetail';
import PatientParametersPlots from './components/PatientParametersPlots';
import Navbar from './components/Navbar';

export default class App extends Component{

  render(){
  return (

  <div className="app-container">
    <Navbar />
    <div className="container">
    <Switch>
    <Route path="/patients/:id/medications" component={MedicationRequestDetail} />
    <Route path="/patients/:id/parameters" component={PatientParametersPlots} />
    <Route path="/patients/:id" component={PatientDetail} />
    <Route path="/patients" component={PatientsList} />
    </Switch>
</div>
  </div>
  );
  }
}


