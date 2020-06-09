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


    onSearchPerform(e) {
        e.preventDefault();
        this.renderPatients();
    }

    renderPatients = async() => {
        let res = await axios.get(`http://localhost:8081/patients/search=${this.state.patientInput}`);
        this.setState({
            patientsList: res.data
        });
        this.props.handleSearch(res.data);
    }

    render(){

        return(
        <div>
        <form className="search-panel" onSubmit={this.onSearchPerform}>
            <input
                type="text"
                placeholder="Enter patient's surname..."
                className = "search-input"
                onChange={event=>this.setState({patientInput: event.target.value})}
             />
             <button className="search-submit" type="submit"> Search</button>
            </form>
        </div>
        );
    }

}