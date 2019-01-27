import React from "react";
import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { NavLink } from "react-router-dom";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";
import {ViewHeadline} from "@material-ui/icons"
// core components
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import sidebarStyle from "assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";

import avatar from "assets/img/faces/avatar.jpg";

import { connect } from 'react-redux';
import { selectTable, selectForm } from 'redux/actions/tables';
import { fetchForms } from 'redux/actions/forms';
const mapDispatchToProps = { selectTable, selectForm, fetchForms};

var ps;

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
class SidebarWrapper extends React.Component {
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    const { className, user, headerLinks, links } = this.props;
    return (
      <div className={className} ref="sidebarWrapper">
        {user}
        {headerLinks}
        {links}
      </div>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    var navManager = [];
    for(var i = 0;i < 10;i ++)
    {
      var tableState = {
        formsOpened: false
      }
      navManager.push(tableState);
    }

    this.state = {
      openAvatar: false,
      openComponents: this.activeRoute("/components"),
      openForms: this.activeRoute("/forms"),
      openTables: this.activeRoute("/tables"),
      openPages: this.activeRoute("-page"),
      miniActive: true,
      selectedTableIndex: 0,
      selectedFormIndex: 0,
      isApplicationOpened: false,
      isTablesOpened: false,
      formsOpened: false,
      fieldsOpened:false,
      navManager: navManager
    };

    
  }


  activeRoute = (routeName) => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  openCollapse = (collapse) => {
    var st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }

  handleClickForms = (tableKey) => {
    var nav = this.state.navManager;
    nav[tableKey]['formsOpened'] = !nav[tableKey]['formsOpened'];
    this.setState({navManager: nav});
  }

  handleClickFields = (tableKey) => {
    this.props.selectTable(tableKey);
  }

  handleClickTable = (selectedTable) => {
    var st = {};
    st[`table${selectedTable}`] = !this.state[`table${selectedTable}`];
    this.setState(st);
    this.setState({selectedTableIndex:selectedTable});
    this.props.selectTable(selectedTable);
  }

  handleClickForm = (tableIndex, formIndex) => {
    this.setState({selectedFormIndex:formIndex});
    this.setState({selectedTableIndex:tableIndex});

    const tableArray = this.props.tables.data.applicationObjects;
    const tablesByIndex = tableArray[tableIndex];
    const formData = tablesByIndex.forms[formIndex];
    this.props.fetchForms(formData.formId);
    this.props.selectTable(tableIndex);
    this.props.selectForm(formIndex);
  }

  handleClickApplication = () => {
    this.setState({isApplicationOpened: !this.state.isApplicationOpened});
  }

  handleClickTables = () => {
    this.setState({isTablesOpened: !this.state.isTablesOpened});
  }

  createNavigationState(){
    const {routes} = this.props;
    var navManager = [];
    for(var i = 0;i < routes.length;i ++)
    {
      var tableState = {
        formsOpened: false
      }
      navManager.push(tableState);
    }
    this.setState({navManager: navManager});
  }

  componentWillMount(){
    const {routes} = this.props;
    if(routes.length === 0)
      return;
    this.createNavigationState();
  }
  componentDidUpdate(oldProps) {
    const oldRoutes = oldProps.routes;
    const {routes} = this.props;
    if(oldRoutes.length !== routes.length)
    {
      this.createNavigationState();
    }
  }

  render() {
    const {
      classes,
      color,
      logo,
      image,
      logoText,
      routes,
      bgColor,
      rtlActive
    } = this.props;
    const itemText =
      classes.itemText +
      " " +
      cx({
        [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
        [classes.itemTextMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.itemTextRTL]: rtlActive
      });
    const collapseItemText =
      classes.collapseItemText +
      " " +
      cx({
        [classes.collapseItemTextMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.collapseItemTextMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.collapseItemTextRTL]: rtlActive
      });
    const userWrapperClass =
      classes.user +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    const caret =
      classes.caret +
      " " +
      cx({
        [classes.caretRTL]: rtlActive
      });
    const collapseItemMini =
      classes.collapseItemMini +
      " " +
      cx({
        [classes.collapseItemMiniRTL]: rtlActive
      });
    const photo =
      classes.photo +
      " " +
      cx({
        [classes.photoRTL]: rtlActive
      });
    var user = (
      <div className={userWrapperClass}>
        <div className={photo}>
          <img src={avatar} className={classes.avatarImg} alt="..." />
        </div>
        <List className={classes.list}>
          <ListItem className={classes.item + " " + classes.userItem}>
            <NavLink
              to={"#"}
              className={classes.itemLink + " " + classes.userCollapseButton}
              onClick={() => this.openCollapse("openAvatar")}
            >
              <ListItemText
                primary={rtlActive ? "User Name" : "User Name"}
                secondary={
                  <b
                    className={
                      caret +
                      " " +
                      classes.userCaret +
                      " " +
                      (this.state.openAvatar ? classes.caretActive : "")
                    }
                  />
                }
                disableTypography={true}
                className={itemText + " " + classes.userItemText}
              />
            </NavLink>
            <Collapse in={this.state.openAvatar} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to="#"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {rtlActive ? "مع" : "MP"}
                    </span>
                    <ListItemText
                      primary={rtlActive ? "ملفي" : "My Profile"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to="#"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {rtlActive ? "هوع" : "EP"}
                    </span>
                    <ListItemText
                      primary={
                        rtlActive ? "تعديل الملف الشخصي" : "Edit Profile"
                      }
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to="#"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {rtlActive ? "و" : "S"}
                    </span>
                    <ListItemText
                      primary={rtlActive ? "إعدادات" : "Settings"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </div>
    );

    const {isApplicationOpened, isTablesOpened} = this.state;

    var links = (
      <List className={classes.list + " " + classes.collapseList}>
        <ListItem className={classes.item}>
          <NavLink
            to={"/"}
            className={
              classes.itemLink +
                " " +
                cx({
                  [" " + classes.collapseActive]: isApplicationOpened
                })
            }
          >
            <ListItemIcon className={classes.itemIcon}>
                <Icon>SettingsOutlined</Icon>
            </ListItemIcon>
            <ListItemText
              primary="Application"
              secondary={
                <b
                  className={
                    caret +
                    " " +
                    (isApplicationOpened ? classes.caretActive : "")
                  }
                />
              }
              disableTypography={true}
              className={
                itemText
              }
              onClick={() => this.handleClickApplication()}
            />
          </NavLink>
        </ListItem>
        <Collapse in={isApplicationOpened} unmountOnExit>
          <List className={classes.list + " " + classes.collapseList}>
            <ListItem className={classes.item}>
            <NavLink
              to={"/"}
              className={
                classes.itemLink +
                  " " +
                  cx({
                    [" " + classes.collapseActive]: isTablesOpened
                  })
              }
            >
              <ListItemIcon className={classes.itemIcon}>
                  <Icon>Tables</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Tables"
                secondary={
                  <b
                    className={
                      caret +
                      " " +
                      (isTablesOpened ? classes.caretActive : "")
                    }
                  />
                }
                disableTypography={true}
                className={
                  itemText
                }
                onClick={() => this.handleClickTables()}
              />
            </NavLink>
            </ListItem>
            <Collapse in={isTablesOpened} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
              {routes.map((prop, tableKey) => {
                if (prop.redirect) {
                  return null;
                }
                if (prop.collapse) {
                  const navLinkClasses =
                    classes.itemLink +
                    " " +
                    cx({
                      [" " + classes.collapseActive]: this.state.selectedTableIndex === tableKey
                    });
                  const itemText =
                    classes.itemText +
                    " " +
                    cx({
                      [classes.itemTextMini]:
                        this.props.miniActive && this.state.miniActive,
                      [classes.itemTextMiniRTL]:
                        rtlActive && this.props.miniActive && this.state.miniActive,
                      [classes.itemTextRTL]: rtlActive
                    });
                  const collapseItemText =
                    classes.collapseItemText +
                    " " +
                    cx({
                      [classes.collapseItemTextMini]:
                        this.props.miniActive && this.state.miniActive,
                      [classes.collapseItemTextMiniRTL]:
                        rtlActive && this.props.miniActive && this.state.miniActive,
                      [classes.collapseItemTextRTL]: rtlActive
                    });
                  const itemIcon =
                    classes.itemIcon +
                    " " +
                    cx({
                      [classes.itemIconRTL]: rtlActive
                    });
                  const caret =
                    classes.caret +
                    " " +
                    cx({
                      [classes.caretRTL]: rtlActive
                    });

                  return (
                    <ListItem key={tableKey} className={classes.item}>
                      <NavLink
                        to={"/tables"}
                        className={navLinkClasses}
                      >
                        <ListItemIcon className={itemIcon}>
                          { typeof prop.icon === "string" ? (
                            <Icon>{prop.icon}</Icon>
                          ) : (
                            <prop.icon />
                          ) }
                        </ListItemIcon>
                        <ListItemText
                          primary={prop.name}
                          secondary={
                            <b
                              className={
                                caret +
                                " " +
                                (this.state[`table${tableKey}`] ? classes.caretActive : "")
                              }
                            />
                          }
                          disableTypography={true}
                          className={itemText}
                          onClick={e => this.handleClickTable(tableKey)}
                        />
                      </NavLink>
                      <Collapse in={this.state[`table${tableKey}`]} unmountOnExit>
                        <List className={classes.list}>
                        
                          <ListItem className={classes.item}>
                            <NavLink
                              to={"/fields"}
                              className={classes.itemLink}
                            >
                              <ListItemIcon className={classes.itemIcon}>
                                  <ViewHeadline />
                              </ListItemIcon>
                              <ListItemText
                                primary="Fields"
                                disableTypography={true}
                                className={itemText}
                                onClick={() => this.handleClickFields(tableKey)}
                              />
                            </NavLink>
                          </ListItem>

                          <ListItem className={classes.item}>

                            <NavLink
                              to={"#"}
                              className={classes.itemLink}
                            >
                              <ListItemIcon className={classes.itemIcon}>
                                <ViewHeadline />
                              </ListItemIcon>
                              <ListItemText
                                primary="Forms"
                                secondary={
                                  <b
                                    className={
                                      caret +
                                      " " +
                                      (this.state['navManager'][tableKey]['formsOpened'] ? classes.caretActive : "")
                                    }
                                  />
                                }
                                disableTypography={true}
                                className={itemText}
                                onClick={(e) => this.handleClickForms(tableKey)}
                              />
                            </NavLink>

                            <Collapse in={this.state['navManager'][tableKey]['formsOpened']} unmountOnExit>
                              <List className={classes.list + " " + classes.collapseList}>
                                {prop.views.map((prop, formKey) => {
                                  if (prop.redirect) {
                                    return null;
                                  }
                                  const navLinkClasses =
                                    classes.collapseItemLink +
                                    " " +
                                    cx({
                                      [" " + classes[color]]: this.state.selectedFormIndex === formKey && this.state.selectedTableIndex === tableKey
                                    });
                                  const collapseItemMini =
                                    classes.collapseItemMini +
                                    " " +
                                    cx({
                                      [classes.collapseItemMiniRTL]: rtlActive
                                    });
                                  return (
                                    <ListItem key={formKey} className={classes.collapseItem} onClick = {e => this.handleClickForm(tableKey,formKey)}>
                                    <NavLink 
                                        to={'forms'}
                                        className={navLinkClasses}>

                                        <span className={collapseItemMini}>
                                          {prop.mini}
                                        </span>
                                        <ListItemText
                                          primary={prop.name}
                                          disableTypography={true}
                                          className={collapseItemText}
                                        />
                                      </NavLink>
                                    </ListItem>
                                  );
                                })}
                              </List>                            
                            </Collapse>

                          </ListItem>
                        </List>
                      </Collapse>
                    </ListItem>
                  );
                }
                const navLinkClasses =
                  classes.itemLink +
                  " " +
                  cx({
                    [" " + classes[color]]: this.activeRoute(prop.path)
                  });
                const itemText =
                  classes.itemText +
                  " " +
                  cx({
                    [classes.itemTextMini]:
                      this.props.miniActive && this.state.miniActive,
                    [classes.itemTextMiniRTL]:
                      rtlActive && this.props.miniActive && this.state.miniActive,
                    [classes.itemTextRTL]: rtlActive
                  });
                const itemIcon =
                  classes.itemIcon +
                  " " +
                  cx({
                    [classes.itemIconRTL]: rtlActive
                  });
                return (
                  <ListItem key={tableKey} className={classes.item}>
                    <NavLink to={prop.path} className={navLinkClasses}>
                      <ListItemIcon className={itemIcon}>
                        {typeof prop.icon === "string" ? (
                          <Icon>{prop.icon}</Icon>
                        ) : (
                          <prop.icon />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={prop.name}
                        disableTypography={true}
                        className={itemText}
                      />
                    </NavLink>
                  </ListItem>
                );
              })}
            </List>
            </Collapse>
          </List>
        </Collapse>
      </List>
    );

    const logoNormal =
      classes.logoNormal +
      " " +
      cx({
        [classes.logoNormalSidebarMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.logoNormalSidebarMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.logoNormalRTL]: rtlActive
      });
    const logoMini =
      classes.logoMini +
      " " +
      cx({
        [classes.logoMiniRTL]: rtlActive
      });
    const logoClasses =
      classes.logo +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    var brand = (
      <div className={logoClasses}>
        <a href="http://www.Dynanet" className={logoMini}>
          <img src={logo} alt="logo" className={classes.img} />
        </a>
        <a href="http://www.Dynanet" className={logoNormal}>
          {logoText}
        </a>
      </div>
    );
    const drawerPaper =
      classes.drawerPaper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.drawerPaperRTL]: rtlActive
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div ref="mainPanel">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={rtlActive ? "left" : "right"}
            open={this.props.open}
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              headerLinks={<HeaderLinks rtlActive={rtlActive} />}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor={rtlActive ? "right" : "left"}
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: "blue"
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose"
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state){
  const {tables} = state;
  return{
    tables
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(sidebarStyle)(Sidebar));
