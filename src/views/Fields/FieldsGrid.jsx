import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from '@material-ui/core/Modal';

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";

// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

//Modals
import PropertyFormText from "../Forms/PropertyFormText";
import AddNewFieldForm from "../Forms/AddNewFieldForm";

//styles
import fieldsGridStyle from "assets/jss/material-dashboard-pro-react/views/FieldsGridStyle.jsx";

import { connect } from 'react-redux';
import { createMapStateToProps } from 'helpers/redux';

const mapStateToProps = createMapStateToProps(['tables', 'selectedTable']);
const mapDispatchToProps = {};

const modalStyle = {
  top: '10%',
  left: '25%',
}

class FieldsGrid extends React.Component
{

  state = {
    clickedFieldData: {},
    isPropertyFormModalOpened: false,
    isAddNewFieldModalOpened: false,
  };
  dataTypes = ['String', 'Number', 'Object', 'Array', 'Boolean', 'Date'];

  handleClickField = (field) => {
    this.setState({clickedFieldData: field});
    this.setState({isPropertyFormModalOpened: true})
  }

  handleClickAddNewField = () => {
    this.setState({isAddNewFieldModalOpened: true})
  }

  handleClosePropertyFormModal = () => {
    this.setState({isPropertyFormModalOpened: false});
  }

  handleCloseAddNewFieldModal = () => {
    this.setState({isAddNewFieldModalOpened: false})
  }


  render(){
    const { classes, tables, selectedTable} = this.props;
    const table = tables.data.applicationObjects[selectedTable.tableIndex];
    
    return (
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>{tables.data.applicationObjects[selectedTable.tableIndex].name}</h4>
              <Button color="rose" className={classes.btnCtrlAddNewField} onClick={this.handleClickAddNewField}>Add New Field</Button>
            </CardHeader>
            <CardBody>
              <GridContainer className={classes.gridContainerHeader}>
                <GridItem xs={2} className={classes.gridItem}>
                  Field Name
                </GridItem>
                <GridItem xs={2} className={classes.gridItem}>
                  Display Name
                </GridItem>
                <GridItem xs={2} className={classes.gridItem}>
                  Data Type
                </GridItem>
                <GridItem xs={2} className={classes.gridItem}>
                  Owner
                </GridItem>
                <GridItem xs={2} className={classes.gridItem}>
                  Date Created
                </GridItem>
              </GridContainer>
              {
              table.Table.map((field, key) => {
              return (
                <GridContainer key={key} className={classes.gridContainerContent} onClick={e => this.handleClickField(field)}>
                  <GridItem xs={2} className={classes.gridItem}>
                    {field.value}
                  </GridItem>
                  <GridItem xs={2} className={classes.gridItem}>
                    {field.label}
                  </GridItem>
                  <GridItem xs={2} className={classes.gridItem}>
                    {this.dataTypes[field.type - 1]}
                  </GridItem>
                  <GridItem xs={2} className={classes.gridItem}>
                    User name
                  </GridItem>
                  <GridItem xs={2} className={classes.gridItem}>
                    22/01/2019
                  </GridItem>
                </GridContainer>
              )  
              })
              }
              <Modal
                open={this.state.isPropertyFormModalOpened}
                onClose={this.handleClosePropertyFormModal}
                disableAutoFocus={true}
                style={modalStyle}
                className={classes.paper}
              >
                <PropertyFormText fieldData={this.state.clickedFieldData} tabIndex={-1} exitModal={this.handleClosePropertyFormModal}/>
              </Modal>
              <Modal
                open={this.state.isAddNewFieldModalOpened}
                onClose={this.handleCloseAddNewFieldModal}
                disableAutoFocus={true}
                style={modalStyle}
                className={classes.paper}
              >
                <AddNewFieldForm fieldData={this.state.clickedFieldData} tabIndex={-1} exitModal={this.handleCloseAddNewFieldModal}/>
              </Modal>
            </CardBody>
          </Card>
    );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(fieldsGridStyle)(FieldsGrid));
