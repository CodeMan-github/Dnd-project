import React, { PureComponent } from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import Button from '@material-ui/core/Button';
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from '@material-ui/core/TextField';

import { treeToJSON, getByPath } from 'helpers';
import {
  saveSections,
} from 'redux/actions/sections';

import {
  createForm,
} from 'redux/actions/forms';

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";



class NewDynaForm extends PureComponent {
  state = {
    applicationId : '5b9c6d72f08ce2d3386ffdc1',
    form: {
      name: '',
      label: '',
      position: 1,
      formDataRef: 'na',
    },
    sections : [],
  };

  // constructor(props) {
  //   super(props);


  //   // this.state = {

  //   //   checked: [24, 22],
  //   //   selectedValue: null,
  //   //   selectedEnabled: "b"
  //   // };

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  // }

  handleInputChange = ({ target }) => this.setState(
    {
      form: {
        ...this.state.form,
        [target.name]: target.value,
      }
    },
  );

  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
  }
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  handleCreateForm = async () => {

    await createForm(this.state);
    // this.props.saveSections(
    //   this.props.forms.data[0]._id,
    //    treeToJSON(this.props.sections.data),
    // );

  };

  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>


            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Form Elements</h4>
              </CardText>
            </CardHeader>
            <CardBody>


              <form>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Form Name:
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <TextField
                      id="text-name"
                      margin="dense"
                      type="text"
                      name="name"
                      fullWidth
                      value={this.state.form.name || ''}
                      onChange={this.handleInputChange}
                    />


                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Form Label
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                  <TextField
                      id="text-label"
                      margin="dense"
                      type="text"
                      name="label"
                      //helpText="A block of help text that breaks onto a new line."
                      fullWidth
                      value={this.state.form.label || ''}
                      onChange={this.handleInputChange}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12}>
                    <Button
                      size="small"
                      color="primary"
                      onClick={this.handleCreateForm}
                    >
                      New Form</Button>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(regularFormsStyle)(NewDynaForm);
