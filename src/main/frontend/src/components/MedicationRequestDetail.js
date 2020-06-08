import React, {Component} from 'react';
import axios from "axios";

//components
import MedicationRequestItem from './MedicationRequestItem';

export default class PatientDetail extends Component{

    generatePatientInfo(patientData){
        const patient = patientData;
        const patientSurname = patient[1];
        const patientName = patient[0];
        const patientBirthDate = patient[3];
        const patientGender = patient[2];

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

    generateMedicationRequestsInfo(medicationRequestData){
        const medicationRequest = medicationRequestData;
        var medicationRequests= [];
        medicationRequests = medicationRequest.map((meds =>
            <MedicationRequestItem key={meds[0][0]}
            medicationRequestItem = {meds}
            />
            ));
        var emptyMessage="";
        if (medicationRequests.length === 0){
            emptyMessage="No medications info for this patient "
        }

        return this.generateResourceList(medicationRequests, emptyMessage);
     }

    generateResourceList(resource, emptyMessage){
        return(
            <article>
               <ul>
                {resource}
                {emptyMessage}
               </ul>
            </article>
            );
    }

    render(){
        const medicationRequestData = this.props.location.state.medicationRequestData;
        const patientData = this.props.location.state.patientData;

        return(
            <div className="single-medication-request-detail">
            {this.generatePatientInfo(patientData)}
            {this.generateMedicationRequestsInfo(medicationRequestData)}
            </div>
        )
    }

}