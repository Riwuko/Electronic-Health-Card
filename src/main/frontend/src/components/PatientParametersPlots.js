import React, {Component} from 'react';
import Select from 'react-select';

//components
import Plot from './Plot';
import PatientDetailHeader from './PatientDetailHeader';

export default class PatientDetail extends Component{
    constructor(){
        super();
        const today=new Date().toISOString().split('T')[0];
        const min="1980-01-01";

        this.state = {
            choosenParameter:"",
            dateFrom:min,
            dateTo:today,
        };

    }

    generateFakeData(origData){
        const fakeData = [...origData,
        [
            "1a","85","kg","Body Weight","29 mar 2019, 21:26:06",
        ],
        [
            "1b", "81","kg","Body Weight","8 kwi 2019, 21:26:06",
        ],
        [
            "1c","88","kg","Body Weight","8 maj 2019, 21:26:06",
        ],
        [
            "1d","89","kg","Body Weight","8 cze 2019, 21:26:06",
        ],
        [
            "1e","90","kg","Body Weight","8 lip 2019, 21:26:06",
        ],
        ]
        console.log(fakeData);
        return fakeData;
    }

    generateObservationPlotData(observationsData, patientData){
        observationsData = this.generateFakeData(observationsData);
        const observationsPlotData = this.filterObservationData(observationsData,this.state.choosenParameter);

        const patientName = patientData[0]+" "+patientData[1];
        const title = patientName+"'s "+this.state.choosenParameter+" data";


        if (observationsPlotData[0] !== undefined){
            var heightData = [];
            var dateData = [];
            for (const obs of observationsPlotData){
               heightData.push(obs[1]);
               dateData.push(obs[4].slice(0,-10));
            }
            const mainLabel = observationsPlotData[0][2];
            return [title,mainLabel,dateData,heightData];
        } else return [title];
     }

     filterObservationData(observationsData, value){
        const dateFrom = new Date(this.state.dateFrom);
        const dateTo = new Date(this.state.dateTo);

        var filteredData = [];
        for (const obs of observationsData){
            const obsDate = new Date(this.handlePolishDate(obs[4]));
            if(obs[3]===value && obsDate >= dateFrom && obsDate <= dateTo){
                filteredData.push(obs);
                }
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
        var options2=[];
        for (const obs of observationsData){
            if(obs[1]!=='null'){
                options2.push(
                    <option key={obs[3]} value={obs[3]}>{obs[3]}</option>
                )
            }
        }

    var options=[];
            for (const obs of observationsData){
                if(obs[1]!=='null'){
                    options.push(
                        {value: obs[3], label: obs[3] }
                    )
                }
        }

    const styles = {
      container: (provided) => ({
        ...provided,
        display: 'inline-block',
        position:'relative',
        minWidth: '250px',
        minHeight: '1px',
        textAlign: 'left',
        border: 'none',
      }),
      control: (provided) => ({
        ...provided,
        border: '2px solid #757575',
        borderRadius: '20px',
        minHeight: '1px',
        height: '42px',
      }),

    };
       return(
        <div className = 'select-parameters'>
            <div>
                <label className="select-label" >Choose a parameter to plot:</label>
            </div>
            <div>
                <Select
                    defaultValue={options.filter(({value}) => value === options[0].value)}
                    className="parameters-to-plot"
                    onChange={event=>this.setState({choosenParameter: event.value})}
                    options={options}
                    styles={styles}
                    />
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
        if (this.state.choosenParameter==="")
            this.setState({
                choosenParameter: observationsData[0][3]
            })
        const patientData = this.props.location.state.patientData;
        const plotData = this.generateObservationPlotData(observationsData,patientData);

        if (this.state.choosenParameter!=="") {
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
        }else return(<div className='empty-message'>No plot data...</div>);
    }
    else return (<div className='error-message'>Error when getting patient data to plot...</div>);

}

}