import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ForwardIcon from '@material-ui/icons/Forward';

import { OAuthSender } from 'components/OAuthProvider';

import { getRandomString } from 'helpers';

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
          {/* <Typography component="h1" variant="display2">Login</Typography> */}
          <OAuthSender
            provider="microsoft"
            nonce={getRandomString(10)}
            render={
              (url => (
                <a href={url}>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Sign in with Microsoft
                    <ForwardIcon className={classes.rightIcon}/>
                  </Button>
                </a>
              ))
            }
          />
        </Paper>
      </div>
    );
  }
}