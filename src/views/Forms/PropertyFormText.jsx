import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Contacts from "@material-ui/icons/Contacts";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';


import { connect } from 'react-redux';
import { updateShapeData } from "redux/actions/tables";
// style for this view
import modalFormsStyle from "assets/jss/material-dashboard-pro-react/modals/modalFormsStyle.jsx";

import Advance from "components/PropertyFormText/Advance";
import General from "components/PropertyFormText/General";
import Colour from "components/PropertyFormText/Colour"

const mapDispatchToProps = { updateShapeData };

const modalStyle = {
  width: '70%',
}
const modalContentStyle = {
  overflowY: 'auto'
}

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}


/* const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}); */

TabContainer.propTypes = {
  /* classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired, */
};

class PropertyFormText extends React.Component {
  state = {
    value: 'one',
    label: "",
    color: "",
    texttype: 1,
    isMultiline: false,
    isDisabled: false,
    isRequired: false,
    isValidate: false,
    errorMessage: "",
    dateRef: ""
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleTextTypeChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  };

  handleChangeLabel = event => {
    this.setState({ label: event.target.value })
  };


  handleChangeMultiline = () => {
    this.setState({ isMultiline: !this.state.isMultiline });
  };


  handleChangeDisabled = () => {
    this.setState({ isDisabled: !this.state.isDisabled });
  };

  handleChangeRequired = () => {
    this.setState({ isRequired: !this.state.isRequired });
  };

  handleChangeValidation = () => {
    this.setState({ isValidate: !this.state.isValidate });
  };

  handleChangeErrorMsg = event => {
    this.setState({ errorMessage: event.target.value });
  };

  handleChangeDateRef = event => {
    this.setState({ dateRef: event.target.value });
  };

  handleChangeColor = color => {
    this.setState({ color: color.hex });
  }

  handleClickSave = async () => {

    const { data } = this.props.forms;
    const { fieldData } = this.props;
    
    this.props.updateShapeData(fieldData.id, this.state, data._id);
    this.props.exitModal();
  };

  handleClickCancel = () => {
    this.props.exitModal();
  }

  componentDidMount() {
    const { fieldData } = this.props;
    this.setState({ 
      label: fieldData.label,
      color: fieldData.color,
      isDisabled: fieldData.disabled,
      texttype: fieldData.texttype,
      isMultiline: fieldData.multiline,
      isRequired: fieldData.required,
      isValidate: fieldData.validation,
      errorMessage: fieldData.errorMessage 
    });
  }


  render() {
    console.log("state", this.state, " - - - ", this.props);
    const { classes } = this.props;
    const {value, label, texttype, isMultiline, isDisabled, isRequired, color, isValidate, errorMessage, dateRef} = this.state;
    return (
      <div>
        <Card style={modalStyle}>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Contacts />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Field Properties</h4>
          </CardHeader>
          <CardBody style={modalContentStyle}>
          
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleTabChange}>
                <Tab value="one" label="General" />
                <Tab value="two" label="Colour" />
                <Tab value="three" label="Advance" />
              </Tabs>
            </AppBar>
      
            {value === 'one' && <TabContainer>
              <General 
                label={label} handleChangeLabel={e => this.handleChangeLabel(e)}
                texttype={texttype} handleTextTypeChange={e => this.handleTextTypeChange(e)}
                isMultiline={isMultiline} handleChangeMultiline={this.handleChangeMultiline}
                isDisabled={isDisabled} handleChangeDisabled={this.handleChangeDisabled}
                isRequired={isRequired} handleChangeRequired={this.handleChangeRequired}
              />

            </TabContainer>}
            {value === 'two' && <TabContainer>
              <Colour 
                color={color} handleChangeColor={this.handleChangeColor}
              />
            </TabContainer>}

            {value === 'three' && <TabContainer>
              <Advance 
                isValidate={isValidate} handleChangeValidation={this.handleChangeValidation} 
                errorMessage={errorMessage} handleChangeErrorMsg={e => this.handleChangeErrorMsg(e)}
                dateRef={dateRef} handleChangeDateRef={e => this.handleChangeDateRef(e)}
              />
            </TabContainer>}

            <GridContainer>
              <GridItem xs={8}>
              </GridItem>
              <GridItem xs={2}>
                <Button color="rose" onClick={this.handleClickSave}>Save</Button>
              </GridItem>
              <GridItem xs={2}>
                <Button color="rose" onClick={this.handleClickCancel}>Cancel</Button>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tables, selectedTable, forms } = state

  return {
    tables,
    selectedTable,
    forms
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(modalFormsStyle)(PropertyFormText));
