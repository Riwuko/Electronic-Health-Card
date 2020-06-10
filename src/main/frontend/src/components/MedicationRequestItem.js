import React, {Component} from 'react';
import Dot from "../styles/dot.png";

export default class MedicationRequestItem extends Component{

    render(){
        const medicationRequest = this.props.medicationRequestItem;
        const status = medicationRequest[1];
        const requester = medicationRequest[2];
        const medicationText = medicationRequest[3];
        const date = medicationRequest[4];
        var liClass="";
        if (this.props.number===1)
             liClass = 'li-odd';
        else liClass = 'li-even';
        const imgClass = liClass+"-img";

        return(
            <div className="single-resource-item">
                <li className={liClass}>
                <div>
                <div className="small-date">  {date} </div>
                <div> {medicationText} </div>
                <div className="small-comment"> status: {status}, prescribed by {requester} </div>
                </div>
                </li>
            <img src={Dot} height={60} width={50}  className={imgClass}/>
            </div>
        )
    };

}