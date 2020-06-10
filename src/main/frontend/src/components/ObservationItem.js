import React, {Component} from 'react';
import Dot from "../styles/dot.png";

export default class ObservationItem extends Component{

    render(){
        const observation = this.props.observationItem;
        const observationTitle = observation[3];
        const observationDate = observation[4];
        var liClass="";
        if (this.props.number===1)
             liClass = 'li-odd';
        else liClass = 'li-even';
        const imgClass = liClass+"-img";

        return(
            <div className="single-resource-item">
            <li className={liClass}>
                <div>
                <div className="small-date"> {observationDate } </div>
                <div> {observationTitle} </div>
                </div>

            </li>
              <img src={Dot} height={60} width={50}  className={imgClass}/>
            </div>
        )
    };

}