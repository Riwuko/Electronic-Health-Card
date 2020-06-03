import React, {Component} from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

export default class PatientItem extends Component{

    render(){
        console.log(this.props.id);
        return(
            <div className="single-patient">
                <h3>{this.props.patient.patientFullData[1]} {this.props.patient.patientFullData[0]} </h3>
            </div>
        )
    }
    
}