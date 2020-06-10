import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class PatientDetailHeader extends Component{

    render(){
        const patient = this.props.patientData;
        var patientSurname = "";
        var patientName = "";
        var patientBirthDate = "";
        var patientGender = "";
        var patientId="";
        if (this.props.patientData !== undefined){
            patientSurname = patient[1];
            patientName = patient[0];
            patientBirthDate = patient[3];
            patientGender = patient[2];
            patientId = patient[4];
        }
        return(
            <header>
            <div className="small-date">
                {patientBirthDate}
            </div>
            <div className="patient-name">
               <span className="link"> <Link to={`/patients/${patientId}`} style={{color:'inherit', textDecoration: 'inherit'}}> {patientName} {patientSurname}</Link></span>, {patientGender}
            </div>
            </header>
        );
    }

}