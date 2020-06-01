import React, {Component} from 'react';
import axios from "axios";
import { render } from '@testing-library/react';
import PatientItem from './PatientItem';

export default class PatientsList extends Component{
    constructor(){
        super()
        this.state = {
            patientsData: []
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
        if (this.state.patientsData.length === 0){
            var patients = [];
            var emptyMessae = "No patients to show...";
        }else{
            var patients = this.state.patientsData.map((patient => 
                <PatientItem key={patient.id}
                id = {patient.id}
                patient = {patient}
                /> 
                ));
            var emptyMessage = "";
        }
        
        console.log(this.state.patientsData);
        return(
            <div className="patients-list">
                {patients}
                {emptyMessae}
            </div>
        )
        
    }
}