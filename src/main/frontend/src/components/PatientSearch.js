import React, {Component} from 'react';
import { render } from '@testing-library/react';
import {Link} from "react-router-dom";
import axios from "axios";

export default class PatientSearch extends Component{
    constructor(){
        super();
        this.state = {
            patientsList:[],
            patientInput:"",
        }
        this.onSearchPerform = this.onSearchPerform.bind(this);

    }

    onSearchPerform= async(handleSearch) => {
        this.renderPatients();
        handleSearch(this.state.patientsList);
    }

    renderPatients = async() => {
        let res = await axios.get(`http://localhost:8081/patients/search=${this.state.patientInput}`);
        console.log(res.data);
        this.setState({
            patientsList: res.data
        });
    }

    render(){

        const {handleSearch} = this.props;

        return(
        <div className="search-panel">
        <form onSubmit={this.onSearchPerform(handleSearch)}>
            <input
                type="text"
                placeholder="Enter patient's surname..."
                id = "search-input"
                onChange={event=>this.setState({patientInput: event.target.value})}
             />
             <button className="search-submit" type="submit"> Search patient</button>
            </form>
        </div>
        );
    }

}