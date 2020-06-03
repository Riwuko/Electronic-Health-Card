import React, {Component} from 'react';
import { render } from '@testing-library/react';


//components
import PatientDetail from "./PatientDetail";

export default class PatientItem extends Component{

    render(){
        console.log(this.props.id);

        return(
            <div className="single-patient" onClick={()=>this.props.goToPatientDetails(this.props.id)}>
                <h3>{this.props.patient.patientFullData[1]} {this.props.patient.patientFullData[0]}</h3>

            </div>
        )
    };
    
}