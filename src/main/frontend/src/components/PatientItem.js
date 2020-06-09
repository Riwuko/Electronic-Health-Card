import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Dot from "../styles/dot.png";

export default class PatientItem extends Component{

    render(){

        return(
            <div className="single-patient-item">
                <div> <img src={Dot} height={50}  /> </div>
                <div className="link"> <Link to={`/patients/${this.props.id}`} style={{color:'inherit', textDecoration: 'inherit'}}><h3>{this.props.patient.patientFullData[1]} {this.props.patient.patientFullData[0]}</h3></Link></div>
            </div>
        )
    };
    
}