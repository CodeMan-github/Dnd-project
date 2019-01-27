import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";


// @material-ui/icons
import Contacts from "@material-ui/icons/Contacts";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";


import { connect } from 'react-redux';

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

const mapDispatchToProps = {};


class TableForm extends React.Component {

  state = {
    table:{
      name:this.props.tables.data.applicationObjects[this.props.selectedTable.tableIndex].name
    }
  };

  componentDidUpdate(oldProps) {
    const newProps = this.props
    if(oldProps.tables.data !== undefined && oldProps.selectedTable.tableIndex !== newProps.selectedTable.tableIndex) {
      this.setState({table:newProps.tables.data.applicationObjects[newProps.selectedTable.tableIndex]})
      return;
    }
  }
  handleChangeName = (e) => {
  }

  render() {
    const { classes, tables} = this.props;
    if(tables.isLoading === true)
      return (
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <Contacts />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Application</h4>
        </CardHeader>
      </Card>
      )
    return (
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <Contacts />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Table</h4>
        </CardHeader>
        <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Table Name
                    </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                      id="email_adress2"
                      formControlProps={{
                          fullWidth: true
                      }}
                      inputProps={{
                          type: "text",
                          value: this.state.table.name
                      }}
                      onChange={e => this.handleChangeName(e)}
                      />
                </GridItem>
            </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const {tables, selectedTable} = state
  return {
      tables,
      selectedTable
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(validationFormsStyle)(TableForm));
