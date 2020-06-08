import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class PatientItem extends Component{

    render(){
        console.log(this.props.id);

        return(
            <div className="single-patient">
                <Link to={`/patients/${this.props.id}`}><h3>{this.props.patient.patientFullData[1]} {this.props.patient.patientFullData[0]}</h3></Link>
            </div>
        )
    };
    
}