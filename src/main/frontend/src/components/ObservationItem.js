import React, {Component} from 'react';

export default class ObservationItem extends Component{

    render(){
        const observation = this.props.observationItem;
        const observationTitle = observation[3];
        const observationDate = observation[4];

        return(
            <div className="single-observation">
                <li>
                <div className="small-date"> {observationDate } </div>
                <div> {observationTitle} </div>
                </li>

            </div>
        )
    };

}