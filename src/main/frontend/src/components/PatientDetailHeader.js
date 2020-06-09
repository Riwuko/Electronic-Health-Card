import React, {Component} from 'react';

export default class PatientDetailHeader extends Component{

    render(){
        const patient = this.props.patientData;
        var patientSurname = "";
        var patientName = "";
        var patientBirthDate = "";
        var patientGender = "";
        if (this.props.patientData !== undefined){
            patientSurname = patient[1];
            patientName = patient[0];
            patientBirthDate = patient[3];
            patientGender = patient[2];
        }
        return(
            <header>
            <div className="small-date">
                {patientBirthDate}
            </div>
            <div className="patient-name">
                {patientName} {patientSurname}, {patientGender}
            </div>
            </header>
        );
    }

}