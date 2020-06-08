import React, {Component} from 'react';

export default class MedicationRequestItem extends Component{

    render(){
        const medicationRequest = this.props.medicationRequestItem;
        console.log(medicationRequest);

        return(
            <div className="single-medicationRequest">
                <li>
                <div className="small-date">  data </div>

                </li>

            </div>
        )
    };

}