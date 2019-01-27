import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";

// core components

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import Table from "components/Table/Table.jsx";
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { createMapStateToProps } from 'helpers/redux';
import { } from "../../redux/actions/tables";
import PropertyFormText from "../Forms/PropertyFormText";
const mapStateToProps = createMapStateToProps(['tables', 'selectedTable']);
const mapDispatchToProps = {};

const style = {
  customCardContentClass: {
    paddingLeft: "0",
    paddingRight: "0"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  labelHorizontal: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingTop: "39px",
    marginRight: "0",
  },
  gridItemCenter: {
    display: "flex",
    justifyContent: "center"
  }
  
};

const modalStyle = {
  top: '10%',
  left: '25%',
  //transform: 'translate(-40%, -40%)'
}

function toObject(names, values) {
  var result = {};
  for (var i = 0; i < names.length; i++)
       result[names[i]] = values[i];
  return result;
}

class RegularTables extends React.Component
{

  constructor(props) {
    super(props);
    this.state = {
      rowData: {},
      modalOpen: false
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleClickRow = this.handleClickRow.bind(this);
    this.exitModal = this.exitModal.bind(this);
  }

  handleCloseModal(){
    this.setState({modalOpen: !this.state.modalOpen});
  }
  handleClickRow(row){
    const {tables, selectedTable} = this.props;
    const table = tables.data.applicationObjects[selectedTable.tableIndex];
    var tableHead = Object.keys(table.Table[0]);
    var rowData = toObject(tableHead, row);
    this.setState({rowData: rowData});
    this.setState({modalOpen: !this.state.modalOpen})
    //console.log(row);

  }

  exitModal(){
    this.setState({modalOpen: !this.state.modalOpen});
  }

  render(){
    const { classes, tables, selectedTable} = this.props;
    if(tables.data === undefined){
      return(
        <Card>
          <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
            </CardHeader>
            <CardBody>
              
            </CardBody>
        </Card>
      )
    }
    const table = tables.data.applicationObjects[selectedTable.tableIndex];
    var tableHead = [], tableData = [];
    tableHead = Object.keys(table.Table[0]);
    table.Table.map((row) => {
      var rowData = [];
      tableHead.map((key) => {
        rowData.push(row[key])
      });
      tableData.push(rowData);
     // console.log("rowData:", rowData);
    });


    
    return (
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>{tables.data.applicationObjects[selectedTable.tableIndex].name}</h4>
            </CardHeader>
            <CardBody>
              <Table
                  hover
                  tableHead={tableHead}
                  tableData={tableData}
                  handleClickRow={this.handleClickRow}
                />
              <Modal
              open={this.state.modalOpen}
              onClose={this.handleCloseModal}
              disableAutoFocus={true}
              style={modalStyle}
              className={classes.paper}
              >
                <PropertyFormText rowData={this.state.rowData} tabIndex={-1} exitModal={this.exitModal}/>
              </Modal>
            </CardBody>
          </Card>
    );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RegularTables));
