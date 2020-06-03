import React, {Component} from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";



export default class PatientDetail extends Component{

    componentDidMount () {
    console.log("Hlako");
        const {id} = this.props.match.params.id;
        console.log(this.props.match.params.id);
    }

    render(){
        return(
            <div className="single-patient-detail">

            </div>
        )
    }

}