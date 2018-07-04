import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { signinUser } from '../../actions/auth';

class SigninForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    // console.log('Signin clicked: ', this.state);
    this.props.signinUser(this.state, this.props.history);
  }

  render() {
    return (
      <div className="row center-xs">
        <Paper className="col-xs-6" elevation={2} style={styles.container}>
          <div style={{ marginTop: '30px' }}>
            <Typography variant="headline">
              Please sign in with a username and password.
            </Typography>
          </div>
          <form>
            <div className="row center-xs">
              <TextField
                className="col-xs-4"
                label="Username"
                margin="normal"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
              />
            </div>
            <div className="row center-xs">
              <TextField
                className="col-xs-4"
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
              label="Submit"
              variant="outlined"
              color="primary"
              style={styles.submit}
              onClick={this.onSubmit.bind(this)}
            >
              Submit
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
  signinUser
})(SigninForm);
