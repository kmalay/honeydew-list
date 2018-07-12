import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { loginUser } from '../actions/auth';
import Animate from './Animate';

class SigninForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state, this.props.history);
  }

  render() {
    return (
      <div className="row center-xs">
        <Paper className="col-xs-10" elevation={2} style={styles.container}>
          <div style={{ marginTop: '30px' }}>
            <Typography variant="headline">
              Please sign in with a email and password.
            </Typography>
          </div>
          <form>
            <div className="row center-xs">
              <TextField
                className="col-xs-6"
                label="Email"
                margin="normal"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="row center-xs">
              <TextField
                className="col-xs-6"
                type="password"
                label="Password"
                margin="normal"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
            <div className="row center-xs" style={styles.error}>
              {this.props.error}
            </div>
            <Button
              label="Sign in"
              variant="contained"
              color="primary"
              style={styles.submit}
              onClick={this.onSubmit.bind(this)}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

const styles = {
  container: {
    marginTop: '50px'
  },
  error: {
    color: 'red',
    fontWeight: 'bold'
  },
  submit: {
    margin: '20px'
  }
};

const mapStateToProps = (state) => {
	return {
    error: state.auth.error
	}
};

export default connect(mapStateToProps, {
  loginUser
})(Animate(SigninForm));
