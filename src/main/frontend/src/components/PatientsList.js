import React, {Component} from 'react';
import axios from "axios";
import { render } from '@testing-library/react';
import {Route, Switch, Link} from "react-router-dom";

//components
import PatientItem from './PatientItem';
import PatientDetail from './PatientDetail'

export default class PatientsList extends Component{
    constructor(){
        super()
        this.state = {
            patientsData: [],
        };
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


    render(){
        var patients = [];
        var emptyMessage ="";

        if (this.state.patientsData.length === 0){
            patients = [];
            emptyMessage = "No patients to show...";
        }else{
            patients = this.state.patientsData.map((patient =>
                <PatientItem key={patient.id}
                id = {patient.id}
                patient = {patient}
                />
                ));
            emptyMessage = "";
        }

        console.log(this.state.patientsData);
        return(
            <div className="patients-list">
                {patients}
                {emptyMessage}
            </div>

        )
        
    }
}