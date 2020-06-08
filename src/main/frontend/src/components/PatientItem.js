import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class PatientItem extends Component{

    render(){

        return(
            <div className="single-patient-item">
                <Link to={`/patients/${this.props.id}`}><h3>{this.props.patient.patientFullData[1]} {this.props.patient.patientFullData[0]}</h3></Link>
            </div>
        )
    };
    
}