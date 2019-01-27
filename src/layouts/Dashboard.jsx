import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import { createDashRoutes } from "../routes/dashboard.jsx";

import RegularForms from "../views/Forms/RegularForms";
import DnDTable from "../views/Forms/DnDTable";
import NewDynaForm from 'components/Form';

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-white.svg";

import { connect } from 'react-redux';
import { createMapStateToProps } from 'helpers/redux';
import { fetchTables } from 'redux/actions/tables';
import ApplicationForm from "../views/Forms/ApplicationForm.jsx";
import TableForm from "../views/Forms/TableForm.jsx";
import FieldsGrid from "../views/Fields/FieldsGrid.jsx";



const mapStateToProps = createMapStateToProps(['tables', 'selectedForm', 'selectedTable']);
const mapDispatchToProps = { fetchTables };


var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false,
      dashRoutes: []
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  async componentDidMount() {
    await this.props.fetchTables();
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", this.resizeFunction);

  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }


  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentWillReceiveProps() {
    
  } 
  render() {
    const {classes, ...rest} = this.props;
    const {tables} = this.props;
    var dashRoutes = [];
    
    if(tables.data != null)
    {
      const tableArray = tables.data.applicationObjects;
      dashRoutes = createDashRoutes(tableArray);
    }

    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashRoutes}
          logoText={"MY DASHBOARD"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={dashRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                <Route exact path="/" component={ApplicationForm}/>
                <Route path="/tables" component={TableForm}/>
                <Route path="/fields" component={FieldsGrid}/>
                <Route path="/forms" component={RegularForms}/>
                <Route path="/dnd" component={DnDTable}/>
                <Route path="/newform" component={NewDynaForm}/>
              </Switch>
            </div>
          </div>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Dashboard));
