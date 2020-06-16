import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

export default class Plot extends Component{

    choosePlotColors(elems) {
        if (elems!==undefined){
            const count = elems.length;
            const colorValues=[];
                for (var i=0; i<count; i++){
                    const r = (Math.floor(Math.random() * (255 - 150)) + 150).toString();
                    const g = (Math.floor(Math.random() * (255 - 180)) + 180).toString();
                    const b = (Math.floor(Math.random() * (255 - 180)) + 180).toString();
                    colorValues.push("rgba("+r+","+g+","+b+",1)");
                }
            return colorValues;
           }else return null;
    }

    preparePlotData(props){
        const plotData = {
            labels: props.labels,
            datasets:[
                {
                    label: props.mainLabel,
                    data: props.data,
                    backgroundColor: props.backgroundColors || this.choosePlotColors(props.labels),
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
                    width={this.props.width || 1000}
                    height={this.props.height || 250}
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