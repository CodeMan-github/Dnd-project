import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import AuthHandler from 'containers/AuthHandler';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1 auto',
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing.unit,
    width: theme.spacing.unit * 40,
    height: theme.spacing.unit * 20,
  },
});

@withStyles(styles)
export default class extends PureComponent {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper elevation={4} className={classes.paper}>
          {/* <Typography component="h1" variant="display2">
            Logging you in <CircularProgress size={25}/>
          </Typography> */}
          <AuthHandler/>
        </Paper>
      </div>
    );
  }
}