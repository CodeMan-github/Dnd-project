import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import { SketchPicker } from 'react-color';

import modalFormsStyle from "assets/jss/material-dashboard-pro-react/modals/modalFormsStyle.jsx";

const Colour = ({classes, ...props}) => {
  return(
    <GridContainer>
      <GridItem xs={12} sm={12} md={3}>
        <FormLabel className={classes.labelHorizontal}>
          Colour
        </FormLabel>
      </GridItem>
      <GridItem xs={12} sm={12} md={9}>
        <FormControl
          fullWidth
        >
          <SketchPicker color={props.color} onChange={color => props.handleChangeColor(color)} />
        </FormControl>
      </GridItem>
    </GridContainer>
  )
}

export default withStyles(modalFormsStyle)(Colour);