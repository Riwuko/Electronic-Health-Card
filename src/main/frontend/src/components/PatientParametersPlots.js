import React, {Component} from 'react';
var CanvasJSReact = require('../canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PatientDetail extends Component{
    constructor(){
        super()
        this.state = {
            choosenParameter:"Body Height",
        };
    }

    generatePatientInfo(patientData){
        const patient = patientData;
        const patientSurname = patient[1];
        const patientName = patient[0];
        const patientBirthDate = patient[3];
        const patientGender = patient[2];

        return(
            <header>
            <div className="small-date">
                {patientBirthDate}
            </div>
            <div className="patient-name">
                {patientName} {patientSurname}, {patientGender}
            </div>
            </header>
        );
        }

    generateObservationPlot(observationsData, patientData){
        console.log(observationsData);
        const observationsPlotData = this.filterObservationData(observationsData,"Body Height");
        console.log(observationsPlotData);
        const patientName = patientData[0]+patientData[1];
        const heightData = observationsPlotData[0][1];

          console.log("heighki: ",heightData);

        const options = {
            exportEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            title:{
                text: patientName+"'s body height changes"
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: [
                    heightData,
                ]
            }]
        }
        console.log(options);
        return options;

     }

     filterObservationData(observationsData, value){
        return observationsData.filter(function(observation) {
          return observation[3]===value;
        });
       }


    render(){
        const observationsData = this.props.location.state.observationData;
        const patientData = this.props.location.state.patientData;

        return(
            <div className="single-medication-request-detail">
            {this.generatePatientInfo(patientData)}
            <CanvasJSChart options = {this.generateObservationPlot(observationsData,patientData)}
            />
            </div>
        )
    }

}