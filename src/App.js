import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import {
  CCol,
  CContainer,
  CRow
} from '@coreui/react';
import Loader from 'react-loader-spinner'
import axios from "axios";


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      status: false,
      regionBoundary: [],
      businessList: [],
      eventsList: [],
      isLoading: false
    }
    this.appStartUp();
  }

  // async componentDidMount() {
  //   try {
  //     setImmediate(async () => {
  //       const res = await fetch('http://localhost:9091/hackathan/group/fetch/getall');
  //       const blocks = await res.json();
  //       console.log(blocks)
  //             this.setState({
  //               businessList: blocks,
  //               eventsList: [],
  //               regionBoundary: [],
  //               status: true
  //             })
  //     },'');
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  async appStartUp() {
    var response = [];
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    await axios.get("http://52.15.135.91:8080/hackathan/group/fetch/getwithstatus")
    // await axios.get("http://localhost:9091/hackathan/group/fetch/getwithstatus")
      .then(data => {
        response = data.data;
      })
      .catch(error => {
        console.log(error)
      })
    this.setState({
      businessList: response,
      status: true
    })
    console.log(JSON.stringify(response))
  }

  // async appStartUp() {
  //   console.log(`App Begins Here`);

  //   var businessFeedList = [
  //     {
  //       "dsGroup": {
  //         "id": 1,
  //         "dac": "DS2020",
  //         "group_name": null,
  //         "ip_address": null,
  //         "status": "Running",
  //         "cpu": "16 cores",
  //         "storage": "500TB",
  //         "ram": "36GB",
  //         "admin_mail": "nilay0016@gmail.com",
  //         "admin_name": "Nilay Gupta",
  //         "last_updated_timestamp": "test",
  //         "date_created_timestamp": "test"
  //       },
  //       "dsServerList": [
  //         {
  //           "dac": "DS2020",
  //           "co_number": "01"
  //         }
  //       ]
  //     },
  //     {
  //       "dsGroup": {
  //         "id": 2,
  //         "dac": "DS2020",
  //         "group_name": "Lia Auto",
  //         "ip_address": "123.992.122.12",
  //         "status": "Running",
  //         "cpu": "16 cores",
  //         "storage": "500TB",
  //         "ram": "36GB",
  //         "admin_mail": "nilay0016@gmail.com",
  //         "admin_name": "Nilay Gupta",
  //         "last_updated_timestamp": "test",
  //         "date_created_timestamp": "test"
  //       },
  //       "dsServerList": [
  //         {
  //           "dac": "DS2020",
  //           "co_number": "01"
  //         }
  //       ]
  //     },
  //     {
  //       "dsGroup": {
  //         "id": 4,
  //         "dac": "DS201",
  //         "group_name": "Kia Auto",
  //         "ip_address": "123.992.1.12",
  //         "status": "Running",
  //         "cpu": "16 cores",
  //         "storage": "500TB",
  //         "ram": "36GB",
  //         "admin_mail": "nilay0016@gmail.com",
  //         "admin_name": "Nilay Gupta",
  //         "last_updated_timestamp": "test",
  //         "date_created_timestamp": "test"
  //       },
  //       "dsServerList": []
  //     },
  //     {
  //       "dsGroup": {
  //         "id": 12,
  //         "dac": "ds2212",
  //         "group_name": "Nilay Auto",
  //         "ip_address": "129.12.1.12",
  //         "status": "Running",
  //         "cpu": "16 cores",
  //         "storage": "500TB",
  //         "ram": "36GB",
  //         "admin_mail": "nil@gmail.com",
  //         "admin_name": "Nil Gupta",
  //         "last_updated_timestamp": null,
  //         "date_created_timestamp": null
  //       },
  //       "dsServerList": []
  //     },
  //     {
  //       "dsGroup": {
  //         "id": 14,
  //         "dac": "DS112",
  //         "group_name": "Nia Auto",
  //         "ip_address": "122.15.13.122",
  //         "status": "Down",
  //         "cpu": "16 cores",
  //         "storage": "500TB",
  //         "ram": "36GB",
  //         "admin_mail": "nil@gmail.com",
  //         "admin_name": "Nil Gupta",
  //         "last_updated_timestamp": null,
  //         "date_created_timestamp": null
  //       },
  //       "dsServerList": []
  //     },
  //     {
  //       "dsGroup": {
  //         "id": 22,
  //         "dac": "DS112",
  //         "group_name": "Nia Auto",
  //         "ip_address": "122.15.13.122",
  //         "status": "Down",
  //         "cpu": "16 cores",
  //         "storage": "500TB",
  //         "ram": "36GB",
  //         "admin_mail": "nil@gmail.com",
  //         "admin_name": "Nil Gupta",
  //         "last_updated_timestamp": null,
  //         "date_created_timestamp": null
  //       },
  //       "dsServerList": []
  //     },
  //     {
  //       "dsGroup": {
  //         "id": 33,
  //         "dac": "TEST112",
  //         "group_name": "TEST Auto",
  //         "ip_address": "122.15.13.112",
  //         "status": "Down",
  //         "cpu": "16 cores",
  //         "storage": "500TB",
  //         "ram": "36GB",
  //         "admin_mail": "nilay0016@gmail.com",
  //         "admin_name": "Nil Gupta",
  //         "last_updated_timestamp": null,
  //         "date_created_timestamp": null
  //       },
  //       "dsServerList": []
  //     },
  //     {
  //       "dsGroup": {
  //         "id": 35,
  //         "dac": "TEST112",
  //         "group_name": "TEST Auto",
  //         "ip_address": "122.15.13.112",
  //         "status": "Down",
  //         "cpu": "16 cores",
  //         "storage": "500TB",
  //         "ram": "36GB",
  //         "admin_mail": "nilay0016@gmail.com",
  //         "admin_name": "Nil Gupta",
  //         "last_updated_timestamp": null,
  //         "date_created_timestamp": null
  //       },
  //       "dsServerList": []
  //     },
  //     {
  //       "dsGroup": {
  //         "id": 36,
  //         "dac": "TEST112",
  //         "group_name": "TEST Auto",
  //         "ip_address": "122.15.13.112",
  //         "status": "Down",
  //         "cpu": "16 cores",
  //         "storage": "500TB",
  //         "ram": "36GB",
  //         "admin_mail": "nilay0016@gmail.com",
  //         "admin_name": "Nil Gupta",
  //         "last_updated_timestamp": null,
  //         "date_created_timestamp": null
  //       },
  //       "dsServerList": []
  //     },
  //     {
  //       "dsGroup": {
  //         "id": 37,
  //         "dac": "TEST112",
  //         "group_name": "TEST Auto",
  //         "ip_address": "122.15.13.112",
  //         "status": "Down",
  //         "cpu": "16 cores",
  //         "storage": "500TB",
  //         "ram": "36GB",
  //         "admin_mail": "nilay0016@gmail.com",
  //         "admin_name": "Nil Gupta",
  //         "last_updated_timestamp": null,
  //         "date_created_timestamp": null
  //       },
  //       "dsServerList": []
  //     },
  //     {
  //       "dsGroup": {
  //         "id": 38,
  //         "dac": "TEST112",
  //         "group_name": "TEST Auto",
  //         "ip_address": "122.15.13.112",
  //         "status": "Down",
  //         "cpu": "16 cores",
  //         "storage": "500TB",
  //         "ram": "36GB",
  //         "admin_mail": "nilay0016@gmail.com",
  //         "admin_name": "Nil Gupta",
  //         "last_updated_timestamp": null,
  //         "date_created_timestamp": null
  //       },
  //       "dsServerList": []
  //     }
  //   ];
  //   var eventFeedList = [];
  //   var geoBoundary = "region"
  //   this.state = ({
  //     businessList: businessFeedList,
  //     eventsList: eventFeedList,
  //     regionBoundary: geoBoundary,
  //     status: true
  //   })
  // }

  render() {
    if (this.state.status == false) {
      return (
        <div className="c-app c-default-layout flex-row align-items-center">
          {/* <Pace color="#27ae60"/> */}
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="2">
                <div className="input-prepend">
                  <Loader
                    type="Audio"
                    color="#002966"
                    height={100}
                    width={100}
                  />
                </div>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      )
    }
    else {
      return (
        <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
              <Route path="/" name="Home" render={props => <TheLayout {...props} regionBoundary={this.state.regionBoundary} eventsList={this.state.eventsList} businessList={this.state.businessList} />} />
            </Switch>
          </React.Suspense>
        </HashRouter>
      );
    }
  }
}

export default App;
