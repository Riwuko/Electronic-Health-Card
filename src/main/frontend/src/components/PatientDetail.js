import React, {Component} from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import axios from "axios";

//components
import ObservationItem from './ObservationItem';

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
        console.log(this.state.patientData);
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
            <div className="patient-birthday">
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
        var emptyMessage ="";

        if (observation.length === 0){
            observations = [];
            emptyMessage = "No observations...";
        }else{
            observations = observation.map((obs =>
                <ObservationItem key={obs.id}
                id = {obs.id}
                observationItem = {obs}
                />
                ));
            emptyMessage = "";

         }

        return(
            <article>
               <ul>
                {observations}
               </ul>
            </article>
            );
    }

    generateMedicationRequestsInfo(){
        console.log(this.state.medicationRequestData);
    }

    render(){

        return(
            <div className="single-patient-detail">
            {this.generatePatientInfo()}
            {this.generateObservationsInfo()}
            </div>
        )
    }

}