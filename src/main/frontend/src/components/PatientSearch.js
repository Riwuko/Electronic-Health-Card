import React, {Component} from 'react';
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

    onSearchPerform() {
        console.log(this.state.patientInput);
        this.props.handleSearch(this.state.patientsList);
    }

    renderPatients = async() => {
        let res = await axios.get(`http://localhost:8081/patients/search=${this.state.patientInput}`);
        console.log(res.data);
        this.setState({
        patientsList: res.data
        });
    }

    render(){

        return(
        <div className="search-panel">
        <form onSubmit={this.onSearchPerform}>
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