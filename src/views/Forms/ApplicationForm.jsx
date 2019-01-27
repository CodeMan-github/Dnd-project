import React from "react";
import Datetime from "react-datetime";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";


// @material-ui/icons
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";


import { connect } from 'react-redux';
import { updateForm } from "redux/actions/tables";

// style for this view
import applicationFormStyle from "assets/jss/material-dashboard-pro-react/views/applicationFormStyle";

const mapDispatchToProps = {updateForm};

class ApplicationForm extends React.Component {

  state = {
    isActive: true
  };

  componentWillMount(){
    if(this.props.tables.data === undefined)
      return;
    this.setState({isActive: this.props.tables.data.active})
  }

  handleChangeActive = () => {
    this.setState({isActive: !this.state.isActive});
  }

  render() {
    const { classes, tables} = this.props;
    const {isActive} = this.state;
    if(tables.data === undefined)
      return null;
    return (
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <Contacts />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Application</h4>
        </CardHeader>
        <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Application Name
                    </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        type: "text",
                    }}
                    />
                </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <FormLabel className={classes.labelHorizontal}>
                  Active
                </FormLabel>
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <Checkbox
                  tabIndex={-1}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                      checked: classes.checked,
                      root: classes.checkRoot
                  }}
                  className={classes.paddingTop}
                  checked={isActive}
                  onChange={this.handleChangeActive}
                  />
              </GridItem>
            </GridContainer> 
            <GridContainer>
                <GridItem xs={3}>
                  <InputLabel className={classes.labelHorizontal}>Created On</InputLabel>
                </GridItem>
                <GridItem xs={9}>
                  <Datetime
                      timeFormat={false}
                      inputProps={{ 
                        placeholder: "Date Picker Here",
                        readOnly:true,
                        disabled:true ,
                        value: new Date().toDateString()
                      }}
                      className={classes.date}
                  />
                </GridItem>
            </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const {tables} = state
  return {
      tables
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(applicationFormStyle)(ApplicationForm));
