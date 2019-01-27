import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import modalFormsStyle from "assets/jss/material-dashboard-pro-react/modals/modalFormsStyle.jsx";

const Advance = ({classes, ...props}) => {

  return(
  <div>
  <GridContainer>
    <GridItem xs={12} sm={12} md={3}>
      <FormLabel className={classes.labelHorizontal}>
        Validation
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
        checked={props.isValidate}
        onChange={props.handleChangeValidation}
      />
    </GridItem>
  </GridContainer>
  <GridContainer>
    <GridItem xs={12} sm={12} md={3}>
      <FormLabel className={classes.labelHorizontal}>
        Error Message
      </FormLabel>
    </GridItem>
    <GridItem xs={12} sm={12} md={9}>
      <CustomInput
        id="ctrl_errorMessage"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          type: "text",
          value: props.errorMessage
        }}
        onChange={e => props.handleChangeErrorMsg(e)}
      />
    </GridItem>
  </GridContainer>
  <GridContainer>
    <GridItem xs={12} sm={12} md={3}>
      <FormLabel className={classes.labelHorizontal}>
        Dateref
      </FormLabel>
    </GridItem>
    <GridItem xs={12} sm={12} md={9}>
      <CustomInput
        id="ctrl_dateRef"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          type: "text",
          value: props.dateRef
        }}
        onChange={e => props.handleChangeDateRef(e)}
      />
    </GridItem>
  </GridContainer>
  </div>
  )
}

export default withStyles(modalFormsStyle)(Advance);