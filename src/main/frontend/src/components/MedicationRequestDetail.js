import React, {Component} from 'react';

//components
import MedicationRequestItem from './MedicationRequestItem';
import PatientDetailHeader from './PatientDetailHeader';

export default class PatientDetail extends Component{

    generateMedicationRequestsInfo(medicationRequestData){
        const medicationRequest = medicationRequestData;
        var medicationRequests= [];
        var count=0;
        medicationRequests = medicationRequest.map((meds =>
            <MedicationRequestItem key={meds[0][0]}
            medicationRequestItem = {meds}
            number = {count++%2}
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
            <article className="resource-list">
               <ul>
                {resource}
                <div className='empty-message'>{emptyMessage}</div>
               </ul>
            </article>
            );
    }

    render(){
    if (this.props.location.state.medicationRequestData !== undefined){
        const medicationRequestData = this.props.location.state.medicationRequestData;
        const patientData = this.props.location.state.patientData;

        return(
        <div>
         <PatientDetailHeader patientData = {patientData}/>
            <div className="single-patient-detail">
            {this.generateMedicationRequestsInfo(medicationRequestData)}
            </div>
        </div>
        )
    } else return(<div className='empty-message'>Error when getting patient data for medication list...</div>);
    }

}