import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

@withStyles(styles)
export default class extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <header>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Typography  color="inherit">
              Form Designer
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}
