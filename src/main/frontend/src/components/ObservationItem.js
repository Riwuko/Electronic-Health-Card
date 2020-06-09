import React, {Component} from 'react';
import Dot from "../styles/dot.png";

export default class ObservationItem extends Component{

    render(){
        const observation = this.props.observationItem;
        const observationTitle = observation[3];
        const observationDate = observation[4];

        return(
            <div className="single-observation-item">
                <div> <img src={Dot} height={60} width={50} /> </div>
                <div>
                <div className="small-date"> {observationDate } </div>
                <div> {observationTitle} </div>
                </div>

            </div>
        )
    };

}