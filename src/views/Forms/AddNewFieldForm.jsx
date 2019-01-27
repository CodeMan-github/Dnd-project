import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
import Button from "components/CustomButtons/Button.jsx";


import { connect } from 'react-redux';
import { addNewField } from "redux/actions/tables";
// style for this view
import modalFormsStyle from "assets/jss/material-dashboard-pro-react/modals/modalFormsStyle.jsx";


const mapDispatchToProps = { addNewField };

const modalStyle = {
  width: '70%',
}
const modalContentStyle = {
  overflowY: 'auto'
}

const isOnlyNumberAndLetters = (str) => {
  let isInvalid = false;
  for(let letter of str)
  {
    if(!((letter >= '0' && letter <= '9') || (letter >= 'a' && letter <= 'z') || (letter >= 'A' && letter <= 'Z')))
    {
      isInvalid = true;
      break;
    }
  }
  if(isInvalid === true)
    return false;
  return true;
}

class AddNewFieldForm extends React.Component {
  
  state = {
    field: {
      type: 0,
      owner: "User Name"
    },
    errMsg_FieldName: undefined,
  };

  dataTypes = ['String', 'Number', 'Object', 'Array', 'Boolean', 'Date'];
  dateToday = new Date();

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleTextTypeChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  };

  handleChangeLabel = event => {
    this.setState({ label: event.target.value })
  };


  handleClickSave = async () => {
    const {value} = this.state.field;
    if(isOnlyNumberAndLetters(value) === false)
    {
      this.setState({errMsg_FieldName: "Only numbers and letters are available for Field Name."})
      return;
    }
    //this.props.addNewField(this.state.field);
    this.props.exitModal();
  };

  handleClickCancel = () => {
    this.props.exitModal();
  }

  handleChangeFieldName = e => {
    this.setState({field: {...this.state.field, value: e.target.value}});
  }

  handleChangeDisplayName = e => {
    this.setState({field: {...this.state.field, label: e.target.value}});
  }

  handleChangeDataType = e => {
    this.setState({field: {...this.state.field, type: e.target.value}});
  }
  handleChangeRequired = () => {
    this.setState({field: {...this.state.field, required: !this.state.field.required}});
  }
  componentDidMount() {
  }


  render() {
    console.log("state", this.state, " - - - ", this.props);
    const { classes } = this.props;
    const { value, label, type, owner, required} = this.state.field;
    const {errMsg_FieldName} = this.state;
    const strDate = `${this.dateToday.getDate()}/${this.dateToday.getMonth() + 1}/${this.dateToday.getFullYear()}`;
    return (
      <Card style={modalStyle}>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <Contacts />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Add New Field</h4>
        </CardHeader>
        <CardBody style={modalContentStyle}>
          <GridContainer className={classes.gridContainer}>
            <GridItem xs={3}>
              <FormLabel className={classes.labelHorizontal}>
                Field Name
              </FormLabel>
            </GridItem>
            <GridItem xs={9}>
              <CustomInput
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  value: value,
                }}
                onChange={e => this.handleChangeFieldName(e)}
                helpText={errMsg_FieldName}
                error={errMsg_FieldName !== undefined}
              />
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={3}>
              <FormLabel className={classes.labelHorizontal}>
                Display Name
              </FormLabel>
            </GridItem>
            <GridItem xs={9}>
              <CustomInput
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  value: label,
                }}
                onChange={e => this.handleChangeDisplayName(e)}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={3}>
              <FormLabel className={classes.labelHorizontal}>
                Data Type
              </FormLabel>
            </GridItem>
            <GridItem xs={9}>
            <FormControl
        fullWidth
        className={classes.selectFormControl}
      >
        <Select
          MenuProps={{
            className: classes.selectMenu
          }}
          classes={{
            select: classes.select
          }}
          value={type}
          onChange={this.handleChangeDataType}
          inputProps={{
          }}
        >
        {
          this.dataTypes.map((type, key) => {
            return(
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value={key}
                key={key}
              >
                {type}
              </MenuItem>
            )
          })
        }
            
          </Select>
        </FormControl>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={3}>
              <FormLabel className={classes.labelHorizontal}>
                User Name
              </FormLabel>
            </GridItem>
            <GridItem xs={9}>
              <CustomInput
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  value: owner
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={3}>
              <FormLabel className={classes.labelHorizontal}>
                isRequired
              </FormLabel>
            </GridItem>
            <GridItem xs={9}>
              <Checkbox
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                    checked: classes.checked,
                    root: classes.checkRoot
                }}
                className={classes.paddingTop}
                checked={required}
                onChange={this.handleChangeRequired}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={3}>
              <FormLabel className={classes.labelHorizontal}>
                Date Created
              </FormLabel>
            </GridItem>
            <GridItem xs={9}>
              <CustomInput
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: strDate,
                  readOnly: true,
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={8}>
            </GridItem>
            <GridItem xs={2}>
              <Button color="rose" onClick={this.handleClickSave}>Add New Field</Button>
            </GridItem>
            <GridItem xs={2}>
              <Button color="rose" onClick={this.handleClickCancel}>Cancel</Button>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(modalFormsStyle)(AddNewFieldForm));
