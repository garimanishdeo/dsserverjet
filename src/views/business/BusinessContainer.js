import React, { Component } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardBody,
} from '@coreui/react';
import BusinessLists from './BusinessLists';
import 'loaders.css/src/animations/ball-clip-rotate-multiple.scss';

export class BusinessContainer extends Component {
    constructor(props) {
      super(props);
      console.log(props);
      this.state = {
            meedss: {},
            regionName: "",
            attractionsList: props.businessList
        }
    }
    render() {
        return (
            <CRow>
                <CCol xs="12" md="12" xl="12">
                    <CCard borderColor="white">
                        {/*<CCardHeader borderColor="white">*/}
                        {/*    <div style={{float:'right'}}>*/}
                        {/*        <CIcon*/}
                        {/*            className="c-header-nav-items mx-2"*/}
                        {/*            name="cil-print"*/}
                        {/*            height={20}*/}
                        {/*            onClick={() => window.print()}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</CCardHeader>*/}
                        <CCardBody borderColor="white">
                            {
                                <BusinessLists data={this.state.attractionsList} />
                            }
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}

export default BusinessContainer;
