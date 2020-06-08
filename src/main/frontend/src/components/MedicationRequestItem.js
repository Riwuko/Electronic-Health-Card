import React, {Component} from 'react';

export default class MedicationRequestItem extends Component{

    render(){
        const medicationRequest = this.props.medicationRequestItem;
        const status = medicationRequest[1];
        const requester = medicationRequest[2];
        const medicationText = medicationRequest[3];
        const date = medicationRequest[4];

        return(
            <div className="single-medicationRequest">
                <li>
                <div className="small-date">  {date} </div>
                <div> {medicationText} </div>
                <div className="small-comment"> status: {status}, prescribed by {requester} </div>
                </li>

            </div>
        )
    };

}