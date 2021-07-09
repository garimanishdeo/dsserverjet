import React, { Component, lazy } from 'react';
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import BusinessDetailsCard from './BusinessDetailsCard'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export class BusinessLists extends Component {
  constructor(props) {
    super(props);
    // var dateUTC = new Date();
    // var dateUTC = dateUTC.getTime()
    // var dateIST = new Date(dateUTC);
    // // dateIST.setHours(dateIST.getHours() + 5);
    // // dateIST.setMinutes(dateIST.getMinutes() + 30);
    // console.log(dateIST);
    this.state = {
      data: props.data,
      showCard: false,
      totalBusinessRegistered: props.data.length,
      rowData: ""
    }
    this.businessCard = null;
  }

  handleRowClick(rowData) {
    this.setState({
      showCard: true
    })
    this.setState({
      rowData: rowData
    })

  }
  handleBackClick = () => {
    this.setState({
      showCard: false
    })
  }
  render() {
    {this.state.data && this.state.data.map(e=>{
      if(e.network != null){
        e.dsGroup.status = e.network.status.toLowerCase().charAt(0).toUpperCase() +e.network.status.toLowerCase().slice(1);
      }else{
        e.dsGroup.status = e.dsGroup.status.toLowerCase().charAt(0).toUpperCase() +e.dsGroup.status.toLowerCase().slice(1);
      }
    })}
    const col = [
      { title: "Status", field: "dsGroup.status",cellStyle: (e, rowData) => {
        // console.log(e)
        // console.log(rowData)
        //   if (e.toLowerCase() === "running" || e.toLowerCase() === "active") {
        //     return { backgroundColor: "#28b825", color:"white" };
        //   }else{
        //     return { backgroundColor: "red", color:"white" };
        //   }
        },
        render: (e,rowData) => {
          console.log(e)
          console.log(rowData)
            if (e.dsGroup.status.toLowerCase() === "running" || e.dsGroup.status.toLowerCase() === "active") {
                  return (
                    <>
                      <span style={{"fontSize" : "1rem","backgroundColor":"#28b825","width":"fit-content","padding":"0px 8px","color":"#fff","borderRadius":"18px"}}></span>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span>Running</span>
                    </>
                  );
                }else{
                  return ( <>
                      <span style={{"fontSize" : "1rem","backgroundColor":"#FF191C","width":"fit-content","padding":"0px 8px","color":"#fff","borderRadius":"18px"}}></span>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span>Down</span>
                    </>
                  );
                }
          }
        },
      { title: "Network Id", field: "dsGroup.id"  },
      { title: "DAC", field: "dsGroup.dac"},
      { title: "Address", field: "dsGroup.ip_address" },
      { title: "Created Date", field: "dsGroup.date_created_timestamp" },
      { title: "Updated", field: "dsGroup.last_updated_timestamp" },
    ];
    // console.log("Hello");
    // console.log(this.state);

    return (
      <>
      {
        this.state.showCard
          ?
          <BusinessDetailsCard handleBackClick={this.handleBackClick} data={this.state.rowData} totalBusinessRegistered={this.state.totalBusinessRegistered} />
          :
          <MaterialTable
            columns={col}
            data = {this.state.data}
            loadingType="overlay"
            title ="Servers List"
            options={{
              headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF'
              }
            }}
            icons={tableIcons}
            onRowClick ={(e, rowData) => this.handleRowClick(rowData)}
          />
    }
    </>
    )
  }
}

  export default BusinessLists;
