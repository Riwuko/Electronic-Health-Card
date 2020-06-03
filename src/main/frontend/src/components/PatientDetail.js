import React, {Component} from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

export default class PatientDetail extends Component{
     constructor(){
            super()
            this.state = {
                patientData: [],
            };
        }

    componentDidMount () {
        const id = this.props.match.params.id;
        this.renderPatientDetails(id);
    }
    renderPatientDetails = async(id) => {
            try {
                let res = await axios.get('http://localhost:8081/patient/${id}');
                this.setState({
                    patientData: res.data
                })

            } catch (err) {
                console.log(err);
            }

        }

    render(){
        return(
            <div className="single-patient-detail">

            </div>
        )
    }

}