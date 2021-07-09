import React, { Component } from 'react';
import {
    CRow,
    CNavLink,
    CCol,
    CNav,
    CSwitch,
    CCard,
    CCardBody,
    CCardHeader,
    CButton,
} from '@coreui/react';
import DashboardAnalytics from './DashboardAnalytics';
import PrintThisComponent from './PrintComponent';
import moment from 'moment';

const divStyle = {
    color: 'blue',
    height: 15,
    width: 700
  };

export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnalytics:true,
            data: props.data,
            numberOfRegisteredBusiness:0,
            todayRow:[0,0,0,0,0,0],
            todayColumn: ["12am-4am","4am-8am","8am-12pm","12pm-4pm","4pm-8pm","8pm-12am"],
            data1: ""

        }
    }

    makeDataForToday = () => {
        let businessData = this.state.data1
        let todayRow = [0,0,0,0,0,0]
        let numberOfRegisteredBusiness=0
        let dateToday = new moment().format("DD-MM-YYYY");
        console.log(`Date Today = ${dateToday}`)
        let registeredBusinessList = []
        for(let j=0; j<businessData.length; j++)
        {
            let startDateBusiness = businessData[j].startDate
            let startDate = moment(startDateBusiness,"DD-MM-YYYY hh:mm:ss").format("DD-MM-YYYY")
            console.log(`Test Data Start Date - ${startDate}`)
            if(dateToday === startDate)
            {
                numberOfRegisteredBusiness+=1;
                console.log(`YES, curr data = ${JSON.stringify(businessData[j])}`)
                registeredBusinessList.push(businessData[j])
                //startDateBusiness = startDateBusiness.split(" ")
                let time = moment(startDateBusiness,"DD-MM-YYYY hh:mm:ss").format("HH:mm:ss")
                console.log(`TIME = ${time}`)
                let todayColumn = this.state.todayColumn
                if(moment(time,"HH:mm:ss").isBetween(moment("00:00:00", "HH:mm:ss"),moment("04:00:00","HH:mm:ss")))
                {
                    let index = todayColumn.indexOf("12am-4am")
                    todayRow[index]+=1
                }
                else if(moment(time,"HH:mm:ss").isBetween(moment("04:00:00", "HH:mm:ss"),moment("08:00:00","HH:mm:ss")))
                {
                    let index = todayColumn.indexOf("4am-8am")
                    todayRow[index]+=1
                }
                else if(moment(time,"HH:mm:ss").isBetween(moment("08:00:00", "HH:mm:ss"),moment("12:00:00","HH:mm:ss")))
                {
                    let index = todayColumn.indexOf("8am-12pm")
                    todayRow[index]+=1
                }
                else if(moment(time,"HH:mm:ss").isBetween(moment("12:00:00", "HH:mm:ss"),moment("16:00:00","HH:mm:ss")))
                {
                    let index = todayColumn.indexOf("12pm-4pm")
                    todayRow[index]+=1
                }
                else if(moment(time,"HH:mm:ss").isBetween(moment("16:00:00", "HH:mm:ss"),moment("20:00:00","HH:mm:ss")))
                {
                    let index = todayColumn.indexOf("4pm-8pm")
                    todayRow[index]+=1
                }
                else if(moment(time,"HH:mm:ss").isBetween(moment("20:00:00", "HH:mm:ss"),moment("24:00:00","HH:mm:ss")))
                {
                    let index = todayColumn.indexOf("8pm-12am")
                    todayRow[index]+=1
                }
            }
        }
        this.setState({ todayRow:todayRow })
        this.setState({ registeredBusinessList:registeredBusinessList })
        this.setState({ showAnalytics:true })
        this.setState({ numberOfRegisteredBusiness:numberOfRegisteredBusiness })
        //console.log(`Registered Business List Local - ${registeredBusinessList}`)
        console.log(`Registered Business List Local - ${this.state.todayRow}`)
        console.log(`Registered Business List Number - ${this.state.numberOfRegisteredBusiness}`)

    }

    makeDataForLastWeek = () =>{
        console.log("TODAY DATA")
    }

    makeDataForLastMonth = () =>{
        console.log("TODAY DATA")
    }

    makeDataForLastYear = () =>{
        console.log("TODAY DATA")
    }


    render() {
        return (
            <>
            {
                this.state.data == undefined
                ?
                <div>Loading...</div>
                :
                <CRow>
                <CCol xs="12">
                    <CCard borderColor="light" color="light">
                        <CCardHeader borderColor="light">
                            <h3>Dashboard</h3>

                        </CCardHeader>
                        <CCardBody>
                            {
                                this.state.showAnalytics == true
                                ?
                                <DashboardAnalytics
                            businessRow = {this.state.todayRow}
                            businessColumn = {this.state.todayColumn}
                            numberOfRegisteredBusiness = {this.state.numberOfRegisteredBusiness}
                            />
                            :
                            <div>Select Filter</div>
                            }

                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            }
            </>
        )
    }
}
