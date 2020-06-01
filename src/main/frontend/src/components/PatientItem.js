import React, {Component} from 'react';
import { render } from '@testing-library/react';

export default class PatientItem extends Component{

    render(){
        console.log(this.props.id);
        return(
            <div className="single-patient">
                <h1>{this.props.patient.patientFullData[0]}</h1>
                <div>{this.props.patient.patientFullData[1]}</div>
                <div>{this.props.patient.patientFullData[2]}</div>
                <div>{this.props.patient.patientFullData[3]}</div>
            </div>
        )
    }
    
}