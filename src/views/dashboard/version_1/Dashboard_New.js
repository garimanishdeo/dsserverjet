import React, { Component } from 'react';
import DashboardContainer from './DashboardContainer'
import {
    CCol,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CButton,
    CTabContent,
    CTabPane,
    CCard,
    CCardBody,
    CTabs,
  } from '@coreui/react'
import 'loaders.css/src/animations/ball-clip-rotate-multiple.scss';

var Loader = require('react-loaders').Loader;
var divStyle = {
    color: 'black',
    margin: 'auto',
    width: '5%',
    height: '300%'
};


export default class Dashboard_New extends Component{

    constructor(props) {
        super(props);
        this.state = {
            regionBusinessList:""
        }
        // this.getBusinessesOfRegion();
    }

    getBusinessesOfRegion() {
    }

    render() {
        return(
            <CRow>
            <CCol xs="12" md="12" xl="12">
                <CCard borderColor="light" color="light">
                    <CCardBody borderColor="light" color="light">
                      {
                        this.state.regionBusinessList == null
                          ?
                          (
                            <CCard borderColor="light">
                              <CCardBody color="light" borderColor="light">
                                <div style={divStyle}>
                                  <Loader type="ball-clip-rotate"  style={{ transform: 'scale(1.8)' }} active />
                                </div>
                              </CCardBody>
                            </CCard>
                          )
                          :
                          <DashboardContainer data={this.state.regionBusinessList}/>
                      }

                    </CCardBody>
                </CCard>

            </CCol>
        </CRow>
        )
    }
}
