// ##############################
// // // ValidationForms view styles
// #############################

import {
  cardTitle,
  dangerColor
} from "assets/jss/material-dashboard-pro-react.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const validationFormsStyle = {
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
    color: "#FFFFFF"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  formCategory: {
    marginBottom: "0",
    color: "#999999",
    fontSize: "14px",
    padding: "10px 0 10px"
  },
  center: {
    textAlign: "center"
  },
  justifyContentCenter: {
    justifyContent: "center"
  },
  registerButton: {
    float: "right"
  },
  danger: {
    color: dangerColor + "!important"
  },
  date: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingTop: "30px",
    marginRight: "0",
  }
};

export default validationFormsStyle;
