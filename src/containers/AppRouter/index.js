import React, { Component } from 'react';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createMapStateToProps } from 'helpers/redux';

import PrivateRoute from 'components/PrivateRoute';
import NewDynaForm from 'components/Form';

// Pages
import {
  NoMatch,
  Login,
  Auth,
} from 'components/pages';

const mapStateToProps = createMapStateToProps(['auth']);

@withRouter
@connect(mapStateToProps)
export default class extends Component {
  render() {
    const isLoggedIn = !!this.props.auth.data.token;
    return (
      <Switch>
        <Redirect exact from="/" to="/sections"/>
        <PrivateRoute hasAccess={isLoggedIn} exact  path="/b" name="routename"  component={NewDynaForm} data={this.props}/>

        <Route exact path="/login" component={Login} />
        <Route hasAccess={!isLoggedIn} redirectTo="/" path="/auth" component={Auth} />
        <Route exact path="/404" component={NoMatch} />
        <Redirect to="/404" />
      </Switch>
    );
  }
}
