import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { closeSnackbar, showSnackbar } from '../actions';
import { logoutUser } from '../actions/auth';
import routes from '../routes';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    width: '100%',
    height: '100%'
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
      snackBarOpen, snackBarMessage, snackBarAutoHideDuration, classes, title
    } = this.props;

    return (
      <div className={classes.root}>
        {this.props.location.pathname === '/'
          ? null
          : <AppBar position="sticky" color="primary">
              <Toolbar>
                <Typography variant="title" color="inherit">
                  {title}
                </Typography>
              </Toolbar>
            </AppBar>
        }
        {routes}
        <Snackbar
          open={snackBarOpen}
          message={snackBarMessage}
          autoHideDuration={snackBarAutoHideDuration}
          onRequestClose={this.handleSnackbarClose.bind(this)}
        />
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
