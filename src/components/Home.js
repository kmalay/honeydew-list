import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

const styles = theme => ({
  primary: {
    color: theme.palette.primary.main,
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="row center-xs">
        <header>
          <Typography variant="display3" paragraph>
            Welcome to CEMS!
          </Typography>
          <Typography variant="headline" paragraph>
            <Link to="/signin" className={classes.primary}>Sign in</Link> with a username and password to get started.
          </Typography>
          <Typography variant="headline" paragraph>
            If you don't have a CEMS account, feel free to <Link to="/" className={classes.primary}>sign up</Link> for one.
          </Typography>
        </header>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
