import React, { Component, lazy } from 'react';
import R from "../../Images/R.png";
import { CRow, CCol, CCard, CCardBody, CCardHeader, CContainer, CButton, CBadge } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { Row, Col } from 'react-grid-system'
import { FaMapMarkerAlt, FaChartBar } from "react-icons/fa";
import { FiExternalLink, FiFacebook } from "react-icons/fi";
import { GiTicket } from "react-icons/gi";
import { IoMdContacts, IoIosPeople, IoIosCall, IoIosMail, IoLogoFacebook, IoMdEye } from 'react-icons/io';
import { TiArrowBack } from 'react-icons/ti';
import { RiHotelLine } from "react-icons/ri";
import { AiFillDollarCircle, AiOutlineAreaChart } from "react-icons/ai";
import axios from 'axios';
import './businessCard.scss';
import { GiChart, GiTeamIdea, GiJourney, GiBanknote, GiConqueror, GiTakeMyMoney, GiPositionMarker, GiAustralia, GiTreasureMap } from "react-icons/gi";
import BusinessCharts from './BusinessCharts';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ReactLoading from 'react-loading';
import { FcSms,FcFeedback,FcCallback,FcDataConfiguration,FcAddressBook,FcAutomotive, FcBusinessman, FcNook, FcElectronics, FcDatabase } from "react-icons/fc";
import GaugeChart from 'react-gauge-chart';




var Spinner = require('react-spinkit');

export class BusinessDetailsCard extends Component {
  constructor(props) {
    super(props);

    if(props.data.network != null && props.data.network.server_ram != null){
      const mem = props.data.network.server_ram;
      const memory = mem.slice(mem.indexOf(":")+1,mem.indexOf("B")-1).trim();
      const ram_per = parseFloat(mem.slice(mem.indexOf("(")+1,mem.indexOf("%")).trim())/100;
      const used = parseInt(memory.slice(0,memory.indexOf("/")));
      const free = parseInt(memory.slice(memory.indexOf("/")+1)) - used;
      const mem_storage = props.data.network.server_storage;
      const memory_storage = mem_storage.slice(mem_storage.indexOf(":")+1,mem_storage.indexOf("B")-1).trim();
      const storage_per = parseFloat(mem_storage.slice(mem_storage.indexOf("(")+1,mem_storage.indexOf("%")).trim())/100;
      const storage_used = parseInt(memory_storage.slice(0,memory_storage.indexOf("/")));
      const storage_free = parseInt(memory_storage.slice(memory_storage.indexOf("/")+1)) - storage_used;
      const cpu = props.data.network.server_cpu_cores;
      const cpu_load = cpu.slice(cpu.indexOf(":")+1).trim();
      this.state = {
        data: props.data,
        totalBusinessRegistered: props.totalBusinessRegistered,
        response: "",
        showChart: false,
        isOpen: false,
        photoIndex: 0,
        ram : memory,
        ram_used : used,
        ram_free : free,
        ram_per : ram_per,
        storage_used: storage_used,
        storage_free : storage_free,
        storage_per : storage_per,
        cpu_load : parseFloat(cpu_load)
      }
    }else{
      const ram_per = 495/1002;
      const storage_per = 2/6;
      const cpu_load = 0;
      this.state = {
        data: props.data,
        totalBusinessRegistered: props.totalBusinessRegistered,
        response: "",
        showChart: false,
        isOpen: false,
        photoIndex: 0,
        ram : "1002",
        ram_used : "495",
        ram_free : "507",
        ram_per : ram_per.toFixed(2),
        storage_used: "2",
        storage_free : "6",
        storage_per : storage_per.toFixed(2),
        cpu_load : parseFloat(cpu_load)

      }
    }
    console.log(this.state)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const retVal = {};
    if (JSON.stringify(nextProps.data)
      !== JSON.stringify(prevState.data)) {
      retVal.data = nextProps.data;
    }
    return {
      ...prevState,
      ...retVal
    }
  }
  componentDidMount() {
    this.getBusinessDetails();
  }

  async getBusinessDetails() {
    let id = this.state.data
    await axios.get(``)
      .then((data) => {
        this.setState({ response: data.data })
      })

  }

  handleImageClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log("cliked");
  };

  showHideCharts = (e) => {
    console.log("Button clicked charts!!")
    if (this.state.showChart == true) {
      this.setState({ showChart: false })
    }
    else {
      this.setState({ showChart: true })
    }
  }

  render() {
    return (
      <>
        {
          this.state.response
            ?
            (
              <>
                <CCard borderColor="white">
                  <CCardHeader>
                    <Col sm={12}>
                      <Row>
                        <Col sm={3}>
                          <CButton color="light" onClick={this.props.handleBackClick}><TiArrowBack size="20" /> <b>BACK</b></CButton>
                        </Col>
                        <Col sm={4}>
                          <div style={{ float: "left" }}>
                            <GiAustralia size="30" color="rgb(26, 140, 255)" />
                          </div>
                          <div style={{ paddingLeft: "10%", float: "left", color: 'rgb(26, 140, 255)', textAlign: 'center' }}>
                            <h3>SYDNEY</h3>
                            <h6>REGION</h6>
                          </div >
                        </Col>
                        <Col sm={2}>
                          <div style={{ float: "left" }}>
                            <GiPositionMarker size="30" color="rgb(255, 204, 0)" />
                          </div>
                          <div style={{ paddingLeft: "5%", float: "left", color: 'rgb(255, 204, 0)', textAlign: 'center' }}>
                            <h3></h3>
                            <h6>SUBURB</h6>
                          </div >
                        </Col>
                        <Col sm={3}>

                          { this.state.data.dsGroup.status != null && this.state.data.dsGroup.status.toLowerCase()   === "running" || this.state.data.dsGroup.status.toLowerCase()  === "active"
                            ?
                            <div style={{ textAlign : "center" }}>
                              <span style={{"fontSize" : "1rem","backgroundColor":"#28b825","width":"fit-content","padding":"0px 8px","color":"#fff","borderRadius":"18px"}}></span>
                              <h6>Running</h6>
                            </div>
                            :
                            <div style={{ textAlign : "center" }}>
                              <span style={{"fontSize" : "1rem","backgroundColor":"#FF191C","width":"fit-content","padding":"0px 8px","color":"#fff","borderRadius":"18px"}}></span>
                              <h6>Down</h6>
                            </div>}
                        </Col>
                      </Row>
                    </Col>
                  </CCardHeader>
                  <CCardBody borderColor="light">
                    <Row>
                      <Col sm={12}>
                        <CCard borderColor="white">
                          <CCardHeader borderColor="white" style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                            <h2>Server Details&nbsp;&nbsp;
                              {/*{ this.state.data.status == "Running" || this.state.data.status == "Active"*/}
                              {/*?*/}
                              {/*<span style={{"fontSize" : "1rem","backgroundColor":"#4CF449","width":"fit-content","padding":"5px 15px","color":"#fff","borderRadius":"18px"}}>Running</span>*/}
                              {/*:*/}
                              {/*<span style={{"fontSize" : "1rem","backgroundColor":"#FF191C","width":"fit-content","padding":"5px 15px","color":"#fff","borderRadius":"18px"}}>Down</span>}*/}
                            </h2>
                          </CCardHeader>
                          <CCardBody style={{ paddingBottom: "0em", paddingTop: "0px" }}>
                            <br />

                            {
                              this.state.data.dsServerList && this.state.data.dsServerList.length > 0 ? (
                                <>
                                  <Row>
                                    <br/>
                                    <Col sm={12}>
                                      <CCard borderColor="white">
                                        <CCardHeader borderColor="white" style={{ color: "#1367b0", padding: "0px"}}>
                                          <h5>DEALER LIST</h5>
                                        </CCardHeader>
                                      </CCard>
                                    </Col>
                                  </Row>
                                  <Row>
                                    {
                                      this.state.data.dsServerList && this.state.data.dsServerList.map(i => (
                                        <Col sm={4} key={i}>
                                          {/*<div  style={{ "backgroundImage": `url(${R})` ,"backgroundSize":"207px 219px","backgroundRepeat":"no-repeat","height":"225px", "padding" : "30px 173px 30px 34px"}}>*/}
                                          {/*  {i.co_name?<h5><span style={{"color":"black","fontSize":"12px"}}>Company Name : </span><span style={{"color":"#d3ff8c","fontSize":"15px"}}>{i.co_name}</span></h5>:""}*/}
                                          {/*  {i.co_number?<h5><span style={{"color":"black","fontSize":"12px"}}>Company Number : </span><span style={{"color":"#d3ff8c","fontSize":"15px"}}>{i.co_number}</span></h5>:""}*/}
                                          {/*  {i.dac?<h5><span style={{"color":"black","fontSize":"12px"}}>DAC : </span><span style={{"color":"#d3ff8c","fontSize":"15px"}}>{i.dac}</span></h5>:""}*/}
                                          {/*</div>*/}
                                          <CCard style={{boxShadow: "3px 3px 4px 2px #24243733", paddingTop: "0px", paddingBottom: "0px"}}>
                                            <CCardBody>
                                              <div>
                                                {i.co_name?<h5><span style={{"color":"rgb(73, 183, 244)"}}>Company Name : &nbsp;&nbsp;&nbsp;</span><span style={{"color":"black","fontSize":"15px"}}>{i.co_name}</span></h5>:""}
                                                {i.co_number?<h5><span style={{"color":"rgb(73, 183, 244)"}}>Company Number : &nbsp;&nbsp;&nbsp;</span><span style={{"color":"black","fontSize":"15px"}}>{i.co_number}</span></h5>:""}
                                                {i.dac?<h5><span style={{"color":"rgb(73, 183, 244)"}}>DAC : &nbsp;&nbsp;&nbsp;</span><span style={{"color":"black","fontSize":"15px"}}>{i.dac}</span></h5>:""}
                                              </div>
                                            </CCardBody>
                                          </CCard>


                                        </Col>
                                      ))
                                    }
                                  </Row>
                                </>
                              ) : ""
                            }

                            <Row>
                              <Col sm={12}>
                                <CCard  borderColor="white">
                                  <CCardHeader borderColor="white" style={{ color: "#1367b0", padding: "0px"}}>
                                    <h5>SERVER INFO</h5>
                                  </CCardHeader>
                                </CCard>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={4}>
                                <CCard style={{boxShadow: "3px 3px 4px 2px #24243733", paddingTop: "0px", paddingBottom: "0px"}}>
                                  <CCardHeader style={{color : "#49B7F4"}}>
                                    <h5><FcDataConfiguration size="21" color="#bfbfbf" /> Dealer Group Name</h5>
                                  </CCardHeader>
                                  <CCardBody>
                                    <h5>{this.state.data.dsGroup.group_name}</h5>
                                  </CCardBody>
                                </CCard>
                              </Col>
                              <Col sm={4}>
                                <CCard style={{boxShadow: "3px 3px 4px 2px #24243733", paddingTop: "0px", paddingBottom: "0px"}}>
                                  <CCardHeader style={{color : "#49B7F4"}}>
                                    <h5><FcAddressBook size="21" color="#bfbfbf" /> Address</h5>
                                  </CCardHeader>
                                  <CCardBody>
                                    <h5>{this.state.data.dsGroup.ip_address}</h5>
                                  </CCardBody>
                                </CCard>
                              </Col>
                              <Col sm={4}>
                                <CCard style={{boxShadow: "3px 3px 4px 2px #24243733", paddingTop: "0px", paddingBottom: "0px"}}>
                                  <CCardHeader style={{color : "#49B7F4"}}>
                                    <h5><FcBusinessman size="21" color="#bfbfbf" /> Admin
                                      <span style={{paddingTop: "0px", paddingBottom: "0px", "float":"right"}}>
                                                                  <a href="tel://+918077890195" target="_blank"><FcCallback title="Call" style={{cursor: "pointer"}} size="21" color="#bfbfbf"/></a>
                                        &nbsp;&nbsp;&nbsp;
                                        <a href={"mailto:" + this.state.data.dsGroup.admin_mail} target="_blank"><FcFeedback title="Mail" style={{cursor: "pointer"}} size="21" color="#bfbfbf"/></a>
                                        &nbsp;&nbsp;&nbsp;
                                        <a href=""><FcSms title="Chat" style={{cursor: "pointer"}} size="21" color="#bfbfbf"/></a>
                                                                </span>
                                    </h5>
                                  </CCardHeader>
                                  <CCardBody>
                                    {this.state.data.dsGroup.admin_name && this.state.data.dsGroup.admin_mail ?
                                      <h5>{this.state.data.dsGroup.admin_name.toLowerCase().charAt(0).toUpperCase() + this.state.data.dsGroup.admin_name.toLowerCase().slice(1)} / {this.state.data.dsGroup.admin_mail}</h5> :
                                      this.state.data.dsGroup.admin_name ?
                                        <h5>{this.state.data.dsGroup.admin_name.toLowerCase().charAt(0).toUpperCase() + this.state.data.dsGroup.admin_name.toLowerCase().slice(1)} </h5> :
                                        <h5>{this.state.data.dsGroup.admin_mail}</h5>
                                    }

                                  </CCardBody>
                                </CCard>
                              </Col>
                            </Row>

                            <Row>
                              <br/>
                              <Col sm={12}>
                                <CCard borderColor="white">
                                  <CCardHeader borderColor="white" style={{ color: "#1367b0", padding: "0px"}}>
                                    <h5>SERVER CONFIGURATION</h5>
                                  </CCardHeader>
                                </CCard>
                              </Col>
                            </Row>

                            {
                              this.state.data.network ? (
                                <><Row>
                                  <Col sm={4}>
                                    <CCard style={{boxShadow: "3px 3px 4px 2px #24243733", paddingTop: "0px", paddingBottom: "0px"}}>
                                      <CCardHeader style={{color : "#49B7F4"}}>
                                        <h5><FcAutomotive size="21" color="#bfbfbf" /> RAM</h5>
                                      </CCardHeader>
                                      <CCardBody>
                                        <h5>{this.state.data.network.server_ram}</h5>
                                        <GaugeChart id="gauge-chart5"
                                                    nrOfLevels={420}
                                                    arcsLength={[0.3, 0.5, 0.2]}
                                                    colors={['#EA4228','#5BE12C']}
                                                    percent={this.state.ram_per}
                                                    arcPadding={0.02}
                                                    textColor = "black"
                                        />
                                      </CCardBody>
                                    </CCard>
                                  </Col>
                                  <Col sm={4}>
                                    <CCard style={{boxShadow: "3px 3px 4px 2px #24243733", paddingTop: "0px", paddingBottom: "0px"}}>
                                      <CCardHeader style={{color : "#49B7F4"}}>
                                        <h5><FcDatabase size="21" color="#bfbfbf" /> Storage</h5>
                                      </CCardHeader>
                                      <CCardBody>
                                        <h5>{this.state.data.network.server_storage}</h5>
                                        <GaugeChart id="gauge-chart5"
                                                    nrOfLevels={420}
                                                    arcsLength={[0.3, 0.5, 0.2]}
                                                    colors={['#EA4228','#5BE12C']}
                                                    percent={this.state.storage_per}
                                                    arcPadding={0.02}
                                                    textColor = "black"
                                        />
                                      </CCardBody>
                                    </CCard>
                                  </Col>
                                  <Col sm={4}>
                                    <CCard style={{boxShadow: "3px 3px 4px 2px #24243733", paddingTop: "0px", paddingBottom: "0px"}}>
                                      <CCardHeader style={{color : "#49B7F4"}}>
                                        <h5><FcElectronics size="21" color="#bfbfbf" /> CPU Cores</h5>
                                      </CCardHeader>
                                      <CCardBody>
                                        <h5>{this.state.data.network.server_cpu_cores}</h5>
                                        {
                                          this.state.data.network.server_cpu_cores ? (
                                            <>
                                              <GaugeChart id="gauge-chart6"
                                                          nrOfLevels={15}
                                                          percent={this.state.cpu_load}
                                                          needleColor="black"
                                                          textColor = "black"
                                              />
                                            </>
                                          ) : <GaugeChart id="gauge-chart6"
                                                          animate={false}
                                                          nrOfLevels={15}
                                                          percent={0.0}
                                                          needleColor="black"
                                                          textColor = "black"
                                          />
                                        }

                                      </CCardBody>
                                    </CCard>
                                  </Col>
                                </Row>
                                </>
                              ):(
                                <>
                                  <Row>
                                    <Col sm={4}>
                                      <CCard style={{boxShadow: "3px 3px 4px 2px #24243733", paddingTop: "0px", paddingBottom: "0px"}}>
                                        <CCardHeader style={{color : "#49B7F4"}}>
                                          <h5><FcAutomotive size="21" color="#bfbfbf" /> RAM</h5>
                                        </CCardHeader>
                                        <CCardBody>
                                          <h5>{this.state.data.dsGroup.ram}</h5>
                                        </CCardBody>
                                      </CCard>
                                    </Col>
                                    <Col sm={4}>
                                      <CCard style={{boxShadow: "3px 3px 4px 2px #24243733", paddingTop: "0px", paddingBottom: "0px"}}>
                                        <CCardHeader style={{color : "#49B7F4"}}>
                                          <h5><FcDatabase size="21" color="#bfbfbf" /> Storage</h5>
                                        </CCardHeader>
                                        <CCardBody>
                                          <h5>{this.state.data.dsGroup.storage}</h5>
                                        </CCardBody>
                                      </CCard>
                                    </Col>
                                    <Col sm={4}>
                                      <CCard style={{boxShadow: "3px 3px 4px 2px #24243733", paddingTop: "0px", paddingBottom: "0px"}}>
                                        <CCardHeader style={{color : "#49B7F4"}}>
                                          <h5><FcElectronics size="21" color="#bfbfbf" /> CPU Cores</h5>
                                        </CCardHeader>
                                        <CCardBody>
                                          <h5>{this.state.data.dsGroup.cpu}</h5>
                                        </CCardBody>
                                      </CCard>
                                    </Col>
                                  </Row>
                                </>
                              )
                            }
                          </CCardBody>
                        </CCard>
                      </Col>
                    </Row>
                  </CCardBody>
                </CCard>
                {
                  <BusinessCharts data={this.state.data.network}/>
                }
              </>
            )
            :
            <div className="c-app c-default-layout flex-row align-items-center">
              <CContainer>
                <CRow className="justify-content-center">
                  <CCol md="2">
                    <div className="input-prepend">
                      <ReactLoading type="spokes" color="#002966" height={'50%'} width={'50%'} />

                    </div>
                  </CCol>
                </CRow>
              </CContainer>
            </div>
        }
      </>
    )
  }
}

export default BusinessDetailsCard;
