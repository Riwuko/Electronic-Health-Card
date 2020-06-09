import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

export default class Plot extends Component{

    preparePlotData(props){
    console.log(props);
        const plotData = {
            labels: props.labels,
            datasets:[
                {
                    label: props.mainLabel,
                    data: props.data,
                    backgroundColors: props.backgroundColors,
                    maxBarThickness: 30,
                }
            ]
        }
        return plotData;
    }

    render(){
        const data = this.preparePlotData(this.props);
        return(
            <div className="chart">
                <Bar
                    data={data}
                    options={{
                        maintainAspectRatio: false,
                        title:{
                            display: true,
                            text: this.props.title,
                            fontSize: 16,
                        },
                        legend:{
                            display: true,
                            position: 'right',
                        }
                    }}
                />
            </div>
        )
    }

}