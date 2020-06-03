import React, {Component} from 'react';
import axios from "axios";
import { render } from '@testing-library/react';
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from "react-router-dom";

//components
import PatientItem from './PatientItem';
import PatientDetail from './PatientDetail';

export default class PatientsList extends Component{
    constructor(){
        super()
        this.state = {
            patientsData: [],
            patientId: null,
            patientDetails: false,
        };
    this.selectPatientHandler = this.selectPatientHandler.bind(this);
    }

    componentDidMount(){
        this.renderPatients();
    }

    renderPatients = async() => {
        try {
            let res = await axios.get('http://localhost:8081/patients');
            this.setState({
                patientsData: res.data
            })

        } catch (err) {
            console.log(err);
        }

    }

    renderRedirect(){
        if(this.state.patientDetails){
            return (
            <Router>
                <Route path={`/patient/:id`} component={PatientDetail}/>
                <Redirect to={`/patient/${this.state.patientId}`} />
            </Router>

        );
        }
    }

    selectPatientHandler(id){
        if (id!==null){
            this.setState({
                patientId: id,
                patientDetails: true
            });
        }
    };

    render(){
        var patients = [];
        var emptyMessage ="";
        if(!this.state.patientDetails){
        if (this.state.patientsData.length === 0){
            patients = [];
            emptyMessage = "No patients to show...";
        }else{
            patients = this.state.patientsData.map((patient =>
                <PatientItem key={patient.id}
                id = {patient.id}
                patient = {patient}
                goToPatientDetails={this.selectPatientHandler}
                />
                ));
            emptyMessage = "";
        }
        }
        console.log(this.state.patientsData);
        return(
            <div className="patients-list">
                {this.renderRedirect()}
                {patients}
                {emptyMessage}
            </div>
        )
        
    }
}