import React, {Component} from 'react';
import { render } from '@testing-library/react';

export default class ObservationItem extends Component{

    render(){
        console.log(this.props);
        const observation = this.props.observationItem;
        const items = [];
          for (const item in observation) {
            items.push(<li>{observation[item][0]}</li>)
          }
          console.log(items);

        return(
            <div className="single-observation">
                <h3></h3>
            </div>
        )
    };

}