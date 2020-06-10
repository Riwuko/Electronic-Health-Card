import React, {Component} from 'react';

//components
import Plot from './Plot';
import PatientDetailHeader from './PatientDetailHeader';

export default class PatientDetail extends Component{
    constructor(){
        super();
        const today=new Date().toISOString().split('T')[0];
        const min="1980-01-01";

        this.state = {
            choosenParameter:"Body Weight",
            dateFrom:min,
            dateTo:today,
        };
    }

    generateObservationPlotData(observationsData, patientData){
        console.log(observationsData);
        const observationsPlotData = [this.filterObservationData(observationsData,this.state.choosenParameter)];

        const patientName = patientData[0]+" "+patientData[1];
        const title = patientName+"'s "+this.state.choosenParameter+" data";

        if (observationsPlotData[0].length !== 0){
            var heightData = [];
            var dateData = [];
            for (const obs of observationsPlotData){
               heightData.push(obs[0][1]);
               dateData.push(obs[0][4].slice(0,-10));
            }

            const mainLabel = observationsPlotData[0][0][2];
            return [title,mainLabel,dateData,heightData];
        } else return [title];
     }

     filterObservationData(observationsData, value){
        const dateFrom = new Date(this.state.dateFrom);
        const dateTo = new Date(this.state.dateTo);

        var filteredData = [];
        for (const obs of observationsData){
            const obsDate = new Date(this.handlePolishDate(obs[4]));
            if(obs[3]===value && obsDate >= dateFrom && obsDate <= dateTo)
                filteredData.push(obs);
        }
        return filteredData;
       }

     handlePolishDate(stringDate){
        const month = stringDate.slice(-18,-15);
        var englishMonth="";
        switch (month) {
          case 'sty':
            englishMonth = "January";
            break;
          case 'lut':
            englishMonth = "February";
            break;
          case 'mar':
            englishMonth = "March";
            break;
          case 'kwi':
            englishMonth = "April";
            break;
          case 'maj':
            englishMonth = "May";
            break;
         case 'cze':
           englishMonth = "June";
           break;
         case 'lip':
            englishMonth = "July";
            break;
         case 'sie':
           englishMonth = "August";
           break;
         case 'wrz':
           englishMonth = "September";
           break;
         case 'paź':
           englishMonth = "October";
           break;
         case 'lis':
            englishMonth = "November";
            break;
        case 'gru':
           englishMonth = "December";
           break;
        }
        const day=stringDate.slice(0,-19);
        const year=stringDate.slice(-14,-10);
        const englishDate = day+"-"+englishMonth+"-"+year;
        return englishDate;
     }

    selectParameterToPlot(observationsData){
        var options=[];
        for (const obs of observationsData){
            if(obs[1]!=='null'){
                options.push(
                    <option key={obs[3]} value={obs[3]}>{obs[3]}</option>
                )
            }
        }
       return(
        <div>
            <div>
                <label className="select-label" >Choose a parameter to plot:</label>
            </div>
            <div>
                <select className="parameters-to-plot" id="parametersToPlot" onChange={event=>this.setState({choosenParameter: event.target.value})}>
                  {options}
                </select>
            </div>
        </div>
        )
    }

    handleDatesRange(dateFrom,dateTo){
        const dFrom = Date.parse(this.state.dateFrom);
        const dTo = Date.parse(this.state.dateTo);
        if(dateFrom===null){
            const tmpTo = Date.parse(dateTo);
            if(tmpTo>=dFrom)
                this.setState({dateTo: dateTo});
        }else{
            const tmpFrom = Date.parse(dateFrom);
            if(tmpFrom<=dTo)
                this.setState({dateFrom: dateFrom});
            }
        console.log(this.state.dateFrom,this.state.dateTo);
    }

    selectPlotDatesRange(){
        const today=new Date().toISOString().split('T')[0];
        const min="1980-01-01";
        return(
            <div className="plot-dates-range">
                <div>
                <label className="date-label">From: </label>
                <input type="date" className="date-picker" min={min} max={today} defaultValue={min}
                    onChange={event=>this.handleDatesRange(event.target.value,null)} />
                    </div><div>
                <label className="date-label">To: </label>
                <input type="date" className="date-picker" min={min} max={today} defaultValue={today}
                     onChange={event=>this.handleDatesRange(null,event.target.value)} />
                     </div>
            </div>
            );
    }

    render(){
        if (this.props.location.state.observationData !== undefined){
        const observationsData = this.props.location.state.observationData;
        const patientData = this.props.location.state.patientData;
        const plotData = this.generateObservationPlotData(observationsData,patientData);

        return(
            <div>
             <PatientDetailHeader patientData = {patientData}/>
             <div className='plot-section'>
             {this.selectParameterToPlot(observationsData)}
            <Plot
                title = {plotData[0]}
                mainLabel = {plotData[1]}
                labels = {plotData[2]}
                data = {plotData[3]}
            />
            {this.selectPlotDatesRange()}
            </div>
            </div>
        )
    }
    else return (<div className='error-message'>Error when getting patient data to plot...</div>);

}

}