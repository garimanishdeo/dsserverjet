import React, { Component } from "react";
import {
    CCard,
    CCardBody,
    CCardGroup,
    CCardHeader
} from '@coreui/react'
import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
    CChartPolarArea
} from '@coreui/react-chartjs'

export default class DashboardAnalytics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            businessRegisteredRow: props.businessRow,
            businessRegisteredColumn: props.businessColumn,
            numberOfRegisteredBusiness: props.numberOfRegisteredBusiness
        }
    }

    render() {
        return (
            <CCardGroup columns className="cols-2" >
                {
                    this.state.businessRegisteredColumn == undefined
                    ?
                    <div>Loading..</div>
                    :
                    <CCard>
                    <CCardHeader borderColor="white" color="white">
                        <b>Servers Count</b>
                    </CCardHeader>
                    <CCardBody>
                        <CChartLine
                            type="line"
                            datasets={[
                                {
                                    label:"Server Counts",
                                    backgroundColor: 'rgb(143, 0, 179)',
                                    data: this.state.businessRegisteredRow
                                }
                            ]}
                            options={{
                                tooltips: {
                                    enabled: true
                                }
                            }}
                            labels={ this.state.businessRegisteredColumn }
                        />
                        <br/>
                        <div>
                            Total Server Count - {this.state.numberOfRegisteredBusiness}<br/>
                        </div>
                    </CCardBody>
                    </CCard>
                }

                <CCard>
                    <CCardHeader borderColor="white" color="white">
                        <b>Server Hits</b>
                    </CCardHeader>
                    <CCardBody>
                        <CChartBar
                            type="bar"
                            datasets={[
                                {
                                    label:"Server Hits",
                                    backgroundColor: 'rgb(26, 140, 255)',
                                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                                }
                            ]}
                            labels="months"
                            options={{
                                tooltips: {
                                    enabled: true
                                }
                            }}
                        />
                    </CCardBody>
                </CCard>


                <CCard>
                    <CCardHeader borderColor="white" color="white">
                        <b>Running Server Report</b>
                            <div className="card-header-actions">
                            <a href="http://www.chartjs.org" className="card-header-action">
                                <small className="text-muted">print</small>
                            </a>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CChartLine
                            type="line"
                            datasets={[
                                {
                                    label: 'Running Servers',
                                    backgroundColor: 'rgb(0, 0, 153)',
                                    data: [10, 38, 25, 75, 30, 55, 28, 35, 25, 30, 10]
                                },
                            ]}
                            options={{
                                tooltips: {
                                    enabled: true
                                }
                            }}
                            labels="months"
                        />
                    </CCardBody>
                </CCard>

                <CCard>
                    <CCardHeader borderColor="white" color="white">
                        <b>Down Server Report</b>
                    </CCardHeader>
                    <CCardBody>
                        <CChartLine
                            type="line"
                            datasets={[
                                {
                                    label: 'Down Servers',
                                    backgroundColor: 'rgb(255, 204, 0)',
                                    data: [50, 75, 63, 82, 69, 160, 87, 137, 166, 287, 95, 83, 50]
                                },
                            ]}
                            options={{
                                tooltips: {
                                    enabled: true
                                }
                            }}
                            labels="months"
                        />
                        <br/>
                    </CCardBody>
                </CCard>

                <CCard>
                    <CCardHeader borderColor="white" color="white">
                        <b>Memory Usage</b>
                    </CCardHeader>
                    <CCardBody>
                        <CChartDoughnut
                            type="doughnut"
                            datasets={[
                                {
                                    backgroundColor: [
                                        '#4DB8FF',
                                        '#9900CC',
                                        '#2EB83E',
                                        '#DD1B16'
                                    ],
                                    data: [32, 18, 25, 25]
                                }
                            ]}
                            labels={['Server1', 'Server2', 'Server3', 'Server4']}
                            options={{
                                tooltips: {
                                    enabled: true
                                }
                            }}
                        />
                    </CCardBody>
                </CCard>

                <CCard>
                    <CCardHeader borderColor="white" color="white">
                        <b>CPU Usage</b>
                    </CCardHeader>
                    <CCardBody>
                        <CChartLine
                            type="line"
                            datasets={[
                                {
                                    label: 'CPU Usage',
                                    backgroundColor: 'rgb(0, 204, 122)',
                                    data: [10, 38, 25, 75, 30, 55, 28, 35, 25, 30, 10]
                                },
                            ]}
                            options={{
                                tooltips: {
                                    enabled: true
                                }
                            }}
                            labels="months"
                        />
                    </CCardBody>
                </CCard>

            </CCardGroup>

        )
    }
}
