import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Route, Switch, Redirect } from 'react-router-dom';




const styles = {
  root: {
    display: 'flex',
    padding: '2rem',
    height: '100%',
  },
};

@withStyles(styles)
export default class Main extends Component {
  render () {
    const { classes } = this.props;

    return (
      
      <div className={classes.root}>
        <Switch>
         
          <Route exact path="/404" component={NoMatch} />
          <Redirect to="/404" />
        </Switch>
      </div>
    );
  }
}
