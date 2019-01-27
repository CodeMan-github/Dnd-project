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
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { connect } from 'react-redux';
import { updateForm } from "redux/actions/tables";
import { fetchForms } from "redux/actions/forms"


import { NavLink } from "react-router-dom";

const mapDispatchToProps = { updateForm, fetchForms };

const buttonContainer = {
  display: 'flex',
  justifyContent: 'flex-end'
}

class RegularForms extends React.Component {

  state = {
    formLabel: ""
  };

  componentDidUpdate(oldProps) {
    const newProps = this.props
    if (oldProps.forms.data.label !== newProps.forms.data.label) {
      this.setState({ formLabel: newProps.forms.data.label })
    }
  }
  handleClickSave = () => {
    this.props.updateForm(this.state.formLabel)
  }

  handleChangeLabel = (e) => {
    this.setState({ formLabel: e.target.value })
  }

  render() {
    const { classes } = this.props;
    const {formLabel} = this.state;
    if (this.props.forms.isLoading === true) {
      return (<div></div>);
    }

    return (
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <Contacts />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Form-{this.props.formIndex} {this.props.forms.data.name}</h4>
        </CardHeader>
        <CardBody>
          <GridContainer justify="flex-end">
            <GridItem xs={12} sm={12} md={9} style={buttonContainer}>
              <NavLink
                to={"/dnd"}
              >
                custom
              </NavLink>
- 
              <NavLink
                to={"/newform"}
              >
                New form
              </NavLink> - 
              <Button color="rose" className={classes.floatRight} onClick={this.handleClickSave}>Save</Button>
            </GridItem>
          </GridContainer>
          {
            Object.keys(this.props.forms.data).map((key, index) => {
              if (key === 'label') {
                return (
                  <GridContainer key={index}>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormLabel className={classes.labelHorizontal}>
                        {key}
                      </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                      <CustomInput
                        id={key} ctrl
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: formLabel
                        }}
                        onChange={(e) => this.handleChangeLabel(e)}
                      />
                    </GridItem>
                  </GridContainer>
                )
              }
              return (
                <GridContainer key={index}>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      {key}
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                      id={key}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: this.props.forms.data[key],
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              )
            })
          }
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const { forms } = state;
  return {
    forms
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(regularFormsStyle)(RegularForms));
