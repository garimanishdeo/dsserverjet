import React, { Component } from 'react';
import {
    CCol,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CButton,
    CTabContent,
    CContainer,
    CTabPane,
    CCard,
    CCardBody,
    CTabs
} from '@coreui/react';
import TouristsTab from './TouristsTab';

export default class MapContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            regionNamesList: null,
            regionIdList: [],
            showTab: false,
            suburbBoundaryList: []
        }
        this.getRegions();
    }

    async getRegions() {
        var meedssBoundaryList = [];
        console.log(meedssBoundaryList)
        this.setState({ suburbBoundaryList: meedssBoundaryList })
        this.setState({ showTab: true })
    }

    render() {
        //console.log("Regions Names Lists -" + JSON.stringify(this.state.regionNamesList))
        //console.log("Regions Length -" + JSON.stringify(this.state.regionNamesList).length)

        return (
            <CRow>
                <CCol xs="12" md="12" xl="12">
                    <CCard>
                        <CCardBody>
                            <CTabs activeTab="tourists">
                                <CNav variant="tabs">
                                    <CNavItem>
                                        <CNavLink data-tab="tourists">
                                            <CButton variant="ghost" color="warning">Server Maps</CButton>
                                        </CNavLink>
                                    </CNavItem>
                                </CNav>
                                <CTabContent>
                                    <CTabPane data-tab="tourists">
                                    {
                                                <TouristsTab
                                                    data={this.state.regionNamesList}
                                                    suburbBoundaryList={this.state.suburbBoundaryList}
                                                />
                                        }
                                    </CTabPane>
                                    <CTabPane data-tab="business">
                                        {`2. Business Tab`}
                                    </CTabPane>
                                </CTabContent>
                            </CTabs>

                        </CCardBody>
                    </CCard>

                </CCol>
            </CRow>
        )
    }
}