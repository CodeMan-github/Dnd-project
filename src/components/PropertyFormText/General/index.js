import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import modalFormsStyle from "assets/jss/material-dashboard-pro-react/modals/modalFormsStyle.jsx";

const General = ({classes, ...props}) => {
  return(
    <div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={3}>
        <FormLabel className={classes.labelHorizontal}>
          Display Name
        </FormLabel>
      </GridItem>
      <GridItem xs={12} sm={12} md={9}>
        <CustomInput
          id="ctrllbl"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            type: "text",
            value: props.label
          }}
          onChange={e => props.handleChangeLabel(e)}
        />
      </GridItem>
    </GridContainer>

    <GridContainer>
      <GridItem xs={12} sm={12} md={3}>
        <FormLabel className={classes.labelHorizontal}>
          TextType
    </FormLabel>
      </GridItem>
      <GridItem xs={12} sm={12} md={9}>
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
            value={props.texttype}
            onChange={props.handleTextTypeChange}
            inputProps={{
              name: "texttype",
              id: "simple-select",
            }}
          >
            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected
              }}
              value={1}
            >
              TextBox
            </MenuItem>
            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected
              }}
              value={2}
            >
              Text Area
            </MenuItem>
            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected
              }}
              value={3}
            >
              Password Control
            </MenuItem>
            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected
              }}
              value={4}
            >
              Numeric
            </MenuItem>
            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected
              }}
              value={5}
            >
              Currency
            </MenuItem>
            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected
              }}
              value={6}
            >
              Email Control
            </MenuItem>
          </Select>
        </FormControl>
      </GridItem>
    </GridContainer>

    <GridContainer>
      <GridItem xs={12} sm={12} md={3}>
        <FormLabel className={classes.labelHorizontal}>
          Multiline
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
          checked={props.isMultiline}
          onChange={props.handleChangeMultiline}
        />
      </GridItem>
    </GridContainer>
    <GridContainer>
      <GridItem xs={12} sm={12} md={3}>
        <FormLabel className={classes.labelHorizontal}>
          Disabled
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
          checked={props.isDisabled}
          onChange={props.handleChangeDisabled}
        />
      </GridItem>
    </GridContainer>
    <GridContainer>
      <GridItem xs={12} sm={12} md={3}>
        <FormLabel className={classes.labelHorizontal}>
          Required
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
          checked={props.isRequired}
          onChange={props.handleChangeRequired}
        />
      </GridItem>
    </GridContainer>
    </div>
  )
}

export default withStyles(modalFormsStyle)(General);

