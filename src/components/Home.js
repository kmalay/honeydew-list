import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HoneydewImage from '../assets/images/honeydew.png';
import Animate from './Animate';

const styles = theme => ({
  logo: {
    height: 'auto',
    width: '400px'
  },
  button: {
    margin: theme.spacing.unit
  },
  primary: {
    color: theme.palette.primary.main,
  }
});

class Home extends Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.history.push('/lists');
    }
  }

  onSignin = () => {
    this.props.history.push('/signin');
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="row center-xs" style={{marginTop: '50px'}}>
        <header>
          <div className="col-xs-12">
            <img src={HoneydewImage} alt="" className={classes.logo} />
          </div>
          <Typography variant="display3" paragraph className="col-xs-12">
            Welcome to Honeydew!
          </Typography>
          <Typography variant="headline" paragraph className="col-xs-12">
            A great place to manage shopping lists, tasks, or anything else you need a list for.
          </Typography>
          <Typography variant="headline" paragraph className="col-xs-12">
            Sign in with an email and password to get started.
          </Typography>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.onSignin.bind(this)}
          >
            Sign in
          </Button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
	};
};

export default connect(mapStateToProps)(withStyles(styles)(Animate(Home)));
