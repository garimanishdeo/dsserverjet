import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react';
import { GiShop, GiConqueror, GiTakeMyMoney, GiJeep } from "react-icons/gi";
import MapStyle from "./MapStyle"
import {
    CChartPie,
} from '@coreui/react-chartjs'
import {
    CCol,
    CButton,
    CRow,
    CCard,
    CCardBody,
    CCollapse,
    CCardHeader,
} from '@coreui/react';
import { Dropdown } from 'semantic-ui-react';

const style = {
    position: 'relative',
    width: '100%',
    height: '80vh'
}
const mapStyle = MapStyle;
class TouristsTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accordion: 0,
            regionNamesList: props.data,
            suburbBoundaryList: props.suburbBoundaryList,
            regionGeoBoundary: [],
            lat: parseFloat(-25.181085),
            lng: parseFloat(134.433281),

            zoomLevel: 9,
            displaySuburb: "Select Server"
        }
    }
    _mapLoaded(mapProps, map) {
        map.setOptions({
            styles: mapStyle
        })
    }

    handleOnChange = (e, data) => {
        console.log(data);
        console.log("CHECK");
        let suburbSelected = data.value;
        for (let i = 0; i < this.state.suburbBoundaryList.length; i++) {
            if (suburbSelected == this.state.suburbBoundaryList[i].name) {
                this.setState({
                    suburbPolygon: this.state.suburbBoundaryList[i].geoList,
                    displaySuburb: this.state.suburbBoundaryList[i].name,
                    displayRegion: "Sydney"
                })
            }
        }
    }

    render() {
        console.log("Child SuburbBoundary Lists Names List =" + JSON.stringify(this.state.suburbBoundaryList))
        var suburbs = [];
        for (let i = 0; i < this.state.suburbBoundaryList.length; i++) {
            let suburbName = this.state.suburbBoundaryList[i].name;
            console.log(suburbName)
            let data = {
                key: suburbName,
                value: suburbName,
                text: suburbName
            }
            suburbs.push(data)
        }
        console.log("LAT Render -:" + suburbs)
        const triangleCoords = this.state.suburbPolygon;
        const latitude = this.state.lat;
        const longitude = this.state.lng;

        return (
            <CRow>
                <CCol xs="12" md="6" xl="6">
                    <Map
                        google={this.props.google}
                        containerStyle={style}
                        initialCenter={{
                            lat: 0,
                            lng: 0,
                        }}
                        center={{
                            lat: 0,
                            lng: 0,
                        }}
                        onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
                        zoom={this.state.zoomLevel}
                    >
                        <Polygon
                            key={triangleCoords}
                            paths={triangleCoords}
                            strokeColor="#4d94ff"
                            strokeOpacity={0.8}
                            strokeWeight={1.5}
                            fillColor="#003d99"
                            fillOpacity={0.5} />
                        {

                            this.state.suburbBoundaryList.map((item, index) => {
                                {
                                    return (
                                        <Polygon
                                            paths={item.geoList}
                                            key={index}
                                            strokeColor="#4d94ff"
                                            strokeOpacity={0.8}
                                            strokeWeight={1}
                                            fillColor="#003d99"
                                            fillOpacity={0.1}
                                            name={index}
                                        />
                                    )
                                }
                            })
                        }
                    </Map>
                </CCol>

                <CCol xs="12" md="6" xl="6">

                    <CRow>

                    </CRow>
                    <CCard borderColor="white">
                        <CCardBody>
                            <div>
                                <div>
                                    <label><h2>Server Info :     </h2></label>
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <label><h2>Details: {this.state.displaySuburb}</h2></label>
                                </div>
                                <Dropdown
                                    placeholder='Enter a Suburb'
                                    fluid
                                    search
                                    selection
                                    value={suburbs.name}
                                    options={suburbs}
                                    onChange={this.handleOnChange}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                    <CRow>

                        <CCol sm="12">
                            <CCard borderColor="white">
                                <CCardBody>
                                    <div id="accordion">
                                        <CCard className="mb-0" borderColor="white">
                                            <CCardHeader id="headingOne" color="white">
                                                <div style={{ textAlign: "left" }}>
                                                    <CButton
                                                        size="md"
                                                        color="white"
                                                        className="text-left m-0 p-0"
                                                        onClick={() => this.state.accordion === 0 ? this.setState({ accordion: null }) : this.setState({ accordion: 0 })}
                                                    >
                                                        <div>
                                                            <div style={{ float: "left" }}>
                                                                <GiConqueror size="65" color="#ffcc00" />
                                                            </div>
                                                            <div style={{ paddingLeft: "20px", float: "left", color: "#ffcc00" }}>
                                                                <h2> 16478</h2>
                                                                <span><small>Tourists Members</small></span>
                                                            </div>
                                                        </div>
                                                    </CButton>
                                                </div>
                                            </CCardHeader>
                                            <CCollapse show={this.state.accordion === 0}>
                                                <CCardBody>
                                                    <div>
                                                        <CChartPie
                                                            type="pie"
                                                            datasets={[
                                                                {
                                                                    backgroundColor: [
                                                                        '#80AAFF',
                                                                        '#E46651',
                                                                        '#FFFF4D',
                                                                        '#CC33FF'
                                                                    ],
                                                                    data: [70, 20, 10]
                                                                }
                                                            ]}
                                                            labels={['Family', 'Couple', 'Alone']}
                                                            options={{
                                                                tooltips: {
                                                                    enabled: true
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </CCardBody>
                                            </CCollapse>
                                        </CCard>

                                        <CCard className="mb-0" borderColor="white">
                                            <CCardHeader id="headingTwo" color="white">
                                                <div style={{ textAlign: "left" }}>
                                                    <CButton
                                                        size="md"
                                                        color="white"
                                                        className="text-left m-0 p-0"
                                                        onClick={() => this.state.accordion === 1 ? this.setState({ accordion: null }) : this.setState({ accordion: 1 })}
                                                    >
                                                        <div>
                                                            <div style={{ float: "left" }}>
                                                                <GiShop size="65" color="#00cc7a" />
                                                            </div>
                                                            <div style={{ paddingLeft: "20px", float: "left", color: "#00cc7a" }}>
                                                                <h2>1783</h2>
                                                                <span><small>Business Registered</small></span>
                                                            </div>
                                                        </div>
                                                    </CButton>
                                                </div>
                                            </CCardHeader>
                                            <CCollapse show={this.state.accordion === 1}>
                                                <CCardBody>
                                                    2. Anim pariatur cliche reprehenderit, enim
                                        </CCardBody>
                                            </CCollapse>
                                        </CCard>

                                        <CCard className="mb-0" borderColor="white">
                                            <CCardHeader id="headingThree" color="white">
                                                <div style={{ textAlign: "left" }}>
                                                    <CButton
                                                        size="md"
                                                        color="white"
                                                        className="text-left m-0 p-0"
                                                        onClick={() => this.state.accordion === 2 ? this.setState({ accordion: null }) : this.setState({ accordion: 2 })}
                                                    >
                                                        <div>
                                                            <div style={{ float: "left" }}>
                                                                <GiTakeMyMoney size="65" color="#000099" />
                                                            </div>
                                                            <div style={{ paddingLeft: "20px", float: "left", color: "#000099" }}>
                                                                <h2><small>$</small>34783</h2>
                                                                <span><small>Tourists Spent</small></span>
                                                            </div>
                                                        </div>
                                                    </CButton>
                                                </div>
                                            </CCardHeader>
                                            <CCollapse show={this.state.accordion === 2}>
                                                <CCardBody>
                                                    3. Anim pariatur cliche reprehenderit, enim enim
                                            </CCardBody>
                                            </CCollapse>
                                        </CCard>

                                        <CCard className="mb-0" borderColor="white">
                                            <CCardHeader id="headingFour" color="white">
                                                <div style={{ textAlign: "left" }}>
                                                    <CButton
                                                        size="md"
                                                        color="white"
                                                        className="text-left m-0 p-0"
                                                        onClick={() => this.state.accordion === 3 ? this.setState({ accordion: null }) : this.setState({ accordion: 3 })}
                                                    >
                                                        <div>
                                                            <div style={{ float: "left" }}>
                                                                <GiJeep size="65" color="#e62e00" />
                                                            </div>
                                                            <div style={{ paddingLeft: "20px", float: "left", color: "#e62e00" }}>
                                                                <h2>243</h2>
                                                                <span><small>Trips Planned</small></span>

                                                            </div>
                                                        </div>
                                                    </CButton>
                                                </div>
                                            </CCardHeader>
                                            <CCollapse show={this.state.accordion === 3}>
                                                <CCardBody>
                                                    2. Anim pariatur cliche reprehenderit, enim
                                        </CCardBody>
                                            </CCollapse>
                                        </CCard>

                                    </div>
                                </CCardBody>
                            </CCard>

                        </CCol>

                    </CRow>
                </CCol>


            </CRow>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDH9CqS0cTZwgiiEtpgqv1yLvTsJKyWepE")
})(TouristsTab)