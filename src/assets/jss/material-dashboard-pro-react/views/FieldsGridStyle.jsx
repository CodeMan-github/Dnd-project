// ##############################
// // // FieldsGrid view styles
// #############################

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
const gridContainerCommon = {
  paddingTop: '12px',
  paddingBottom: '12px',
  marginLeft: '15px',
  marginRight: '15px',
  borderBottom: '1px solid #DDDDDD',
  width: 'calc(100% - 30px)',
}
const fieldsGridStyle = {
  ...customCheckboxRadioSwitch,
  ...customSelectStyle,
  cardTitle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
    display: 'inline-block',
  },
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(0, 0, 0, 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex"
  },
  mrAuto: {
    marginRight: "auto"
  },
  mlAuto: {
    marginLeft: "auto"
  },
  gridContainerHeader: {
    fontSize: "17px",
    ...gridContainerCommon,
  },
  gridContainerContent: {
    fontSize: "14px",
    ...gridContainerCommon,
  },
  gridItem: {
    cursor: "pointer",
    paddingLeft: '8px !important',
    paddingRight: '8px !important',
  },
  btnCtrlAddNewField: {
    display: 'block',
    marginRight: '20px',
    marginTop: '15px',
    float: 'right',
  }
};

export default fieldsGridStyle;
