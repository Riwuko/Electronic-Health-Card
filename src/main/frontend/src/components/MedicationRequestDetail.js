import React, {Component} from 'react';

//components
import MedicationRequestItem from './MedicationRequestItem';
import PatientDetailHeader from './PatientDetailHeader';

export default class PatientDetail extends Component{

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
             <PatientDetailHeader patientData = {patientData}/>
            {this.generateMedicationRequestsInfo(medicationRequestData)}
            </div>
        )
    }

}