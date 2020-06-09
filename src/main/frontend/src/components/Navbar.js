import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Navbar extends Component{

    render(){
        return(
            <div>
                <nav className = 'navbar-top'>
                    <div className='link'> <Link to={`/patients`} style={{color:'inherit', textDecoration: 'inherit'}} >Patients list</Link> </div>
                    <div className='title'>
                    <div> <h1> Electronic Patient's Card </h1> </div>
                    </div>
                </nav>
            </div>
       )
    }

}