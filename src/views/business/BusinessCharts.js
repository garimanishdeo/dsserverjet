import React, { Component } from "react";
import {
    CCard,
    CCardBody,
    CCardGroup,
    CCardHeader
} from '@coreui/react'
import {
    CChartBar,
    CChartDoughnut,
} from '@coreui/react-chartjs'

export default class BusinessCharts extends Component {

    constructor(props) {
        super(props);
      console.log(props)


      if(props != null && props.data != null && props.data.server_ram != null){
        const mem = props.data.server_ram;
        const memory = mem.slice(mem.indexOf(":")+1,mem.indexOf("MB")).trim();
        const used = parseInt(memory.slice(0,memory.indexOf("/")));
        const free = parseInt(memory.slice(memory.indexOf("/")+1)) - used;
        this.state = {
          ram : memory,
          used : used,
          free : free
        }
      }else{
        this.state = {
          ram : "1002",
          used : "495",
          free : "507"
        }
      }


    }

    render() {

        return (
            <CCardGroup columns className="cols-2" >
                <CCard>
                    <CCardHeader borderColor="white">
                        <b>Server Status</b>
                    </CCardHeader>
                    <CCardBody>
                    <CChartBar
                            type="bar"
                            datasets={[
                                {
                                    label:"Server Status",
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
                    <CCardHeader borderColor="white">
                        <b>Ram Usage</b>
                    </CCardHeader>
                    <CCardBody>
                    <CChartDoughnut
                            type="doughnut"
                            datasets={[
                                {
                                    backgroundColor: [
                                        '#4DB8FF',
                                        '#2EB83E'
                                    ],
                                    data: [this.state.used, this.state.free]
                                }
                            ]}
                            labels={['Used', 'Free']}
                            options={{
                                tooltips: {
                                    enabled: true
                                }
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCardGroup>
        )
    }
}
