import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { closeSnackbar, showSnackbar } from '../actions';
import { logoutUser } from '../actions/auth';
import routes from '../routes';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
});

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDlgAR2IkimQjGMn5jMzen8ETms_URpcQA",
      authDomain: "honeydew-4bb72.firebaseapp.com",
      databaseURL: "https://honeydew-4bb72.firebaseio.com",
      projectId: "honeydew-4bb72",
      storageBucket: "honeydew-4bb72.appspot.com",
      messagingSenderId: "1051075096946"
    };

    firebase.initializeApp(config);
    const messaging = firebase.messaging();

    messaging.onMessage(payload => {
      console.log("Message received: ", payload);
      this.props.showSnackbar(payload.data.text);
    });

    window.addEventListener('online', () => {
      console.log('Device is online!');
      this.syncResponses();
    });

    window.addEventListener('offline', () => {
      console.log('Device is offline!');
    });

    if (this.props.authenticated) {
      this.props.history.push('/lists');
    }
  }

  handleSnackbarActionClick = () => {
    window.location.reload(true);
  }

  handleSnackbarClose() {
    this.props.closeSnackbar();
  }

  onSignout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const {
      snackBarOpen, snackBarMessage, snackBarAutoHideDuration, classes
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          {routes}
          <Snackbar
            open={snackBarOpen}
            message={snackBarMessage}
            autoHideDuration={snackBarAutoHideDuration}
            onRequestClose={this.handleSnackbarClose.bind(this)}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const {
    snackBarMessage, snackBarOpen, snackBarAutoHideDuration
  } = state.alert;

  const { title } = state.header;
  const { authenticated } = state.auth;

	return {
    snackBarMessage, snackBarOpen, snackBarAutoHideDuration,
    title, authenticated
	};
};

export default connect(mapStateToProps, {
  closeSnackbar, logoutUser, showSnackbar
})(withStyles(styles, { withTheme: true })(App));
