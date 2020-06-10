import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

//components
import ObservationItem from './ObservationItem';
import PatientDetailHeader from './PatientDetailHeader';

export default class PatientDetail extends Component{
     constructor(){
            super()
            this.state = {
                patientId:"",
                patientData: [],
                patientPersonalData:[],
                observationData:[],
                medicationRequestData:[],
            };
        }

    componentDidMount () {
        const id = this.props.match.params.id;
        this.setState({
            patientId : id,
        });
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
                patientPersonalData: [...this.state.patientData[property].patientFullData, this.state.patientData[property].id],
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

    generateObservationsInfo(){
        const observation = this.state.observationData;
        var observations = [];
        var count=0;
        observations = observation.map((obs =>
            <ObservationItem key={obs[0]}
            observationItem = {obs}
            number = {count++%2}
            />
            ));

        var emptyMessage="";
         if (observations.length === 0){
            emptyMessage="No observations info for this patient "
        }
        return this.generateResourceList(observations, emptyMessage);
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
        return(
            <div>
             <div><PatientDetailHeader patientData = {this.state.patientPersonalData}/></div>
            <div className="single-patient-detail">
            {this.generateObservationsInfo()}

            <div className='link-button'>
                <Link style={{color:'inherit', textDecoration: 'inherit'}} to={{
                    pathname:`${this.state.patientId}/medications`,
                    state: {
                        patientData: this.state.patientPersonalData,
                        medicationRequestData : this.state.medicationRequestData} }}
                >Check medications history</Link>
            </div>

            <div className='link-button'>
                 <Link style={{color:'inherit', textDecoration: 'inherit'}} to= {{
                        pathname:`${this.state.patientId}/parameters`,
                        state: {
                            patientData: this.state.patientPersonalData,
                            observationData : this.state.observationData} }}
                    >Check patient parameters plots</Link>
            </div>
            </div>

            </div>
        )
    }

}