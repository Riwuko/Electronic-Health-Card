

import React, {Component} from 'react';
import axios from "axios";

//components
import ObservationItem from './ObservationItem';
import MedicationRequestItem from './MedicationRequestItem';

export default class PatientDetail extends Component{
     constructor(){
            super()
            this.state = {
                patientData: [],
                patientPersonalData:[],
                observationData:[],
                medicationRequestData:[],

            };
        }

    componentDidMount () {
        const id = this.props.match.params.id;
        this.renderPatientDetails(id);

    }
    renderPatientDetails = async(id) => {
            try {
                let res = await axios.get(`http://localhost:8081/patient/${id}`);
                this.setState({
                    patientData: res.data
                })
                this.setStatePatientData();

            } catch (err) {
                console.log(err);
            }

        }

    setStatePatientData(){
        for (const property in this.state.patientData) {
          if (typeof this.state.patientData[property].patientFullData!=="undefined"){
            this.setState({
                patientPersonalData: this.state.patientData[property].patientFullData,
            });
            }
          else if (typeof this.state.patientData[property].observationFullData!=="undefined"){
             const newObservationData = [...this.state.observationData, this.state.patientData[property].observationFullData];
             this.setState({
                observationData : newObservationData,
             });
             }
          else if (typeof this.state.patientData[property].medicationRequestFullData!=="undefined") {
                const newMedicationRequestData = [...this.state.medicationRequestData, this.state.patientData[property].medicationRequestFullData];
                 this.setState({
                    medicationRequestData : newMedicationRequestData,
                 });
          }
        }
    }

    generatePatientInfo(){
        const patient = this.state.patientPersonalData;
        return(
            <header>
            <div className="small-date">
                {patient[3]}
            </div>
            <div className="patient-name">
                {patient[0]} {patient[1]}, {patient[2]}
            </div>
            </header>
        );
    }

    generateObservationsInfo(){
        const observation = this.state.observationData;
        var observations = [];
        observations = observation.map((obs =>
            <ObservationItem key={obs[0][0]}
            observationItem = {obs}
            />
            ));

        var emptyMessage="";
         if (observations.length === 0){
            emptyMessage="No observations info for this patient "
        }
        return this.generateResourceList(observations, emptyMessage);
    }

    generateMedicationRequestsInfo(){
        const medicationRequest = this.state.medicationRequestData;
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
        return(
            <div className="single-patient-detail">
            {this.generatePatientInfo()}
            {this.generateObservationsInfo()}
            {this.generateMedicationRequestsInfo()}
            </div>
        )
    }

}