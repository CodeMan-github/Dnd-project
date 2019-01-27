import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1 auto',
    flexDirection: 'column',
  },
};

export default withStyles(styles)(({ classes }) => (
  <div className={classes.root}>
    <div>
      Oops! The page you are looking for is not found.
    </div>
    <div>
      But you can go to <Link to="/">Homepage</Link>
    </div>
  </div>
));
