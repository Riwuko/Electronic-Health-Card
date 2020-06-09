import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Navbar extends Component{

    render(){
        return(
            <div>
                <nav className = 'navbar-top'>
                    <Link to={`/patients`}>Patients list</Link>
                </nav>
            </div>
       )
    }

}