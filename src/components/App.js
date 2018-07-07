import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SignoutIcon from '@material-ui/icons/Input';
import ListIcon from '@material-ui/icons/ViewList';
import AddListIcon from '@material-ui/icons/AddBox';
import { closeSnackbar, showSnackbar } from '../actions';
import { logoutUser } from '../actions/auth';
import routes from '../routes';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  nav: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navItem: 0
    }
  }

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

    switch(this.props.location.pathname) {
      case '/lists/add': {
        this.setState({ navItem: 0});
        break;
      }
      default: {
        this.setState({ navItem: 1 });
        break;
      }
    }
  }

  handleNavChange(e, navItem) {
    this.setState({ navItem });

    if (navItem === 2) {
      this.props.logoutUser();
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
      snackBarOpen, snackBarMessage, snackBarAutoHideDuration, classes, title
    } = this.props;

    let showNav;
    switch(this.props.location.pathname) {
      case '/': {
        showNav = false;
        break;
      }
      case '/signin': {
        showNav = false;
        break;
      }
      default: {
        showNav = true;
        break;
      }
    }

    return (
      <div className={classes.root}>
        {this.props.location.pathname === '/'
          ? null
          : <AppBar position="static" color="primary">
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
        {!showNav
          ? null
          : <BottomNavigation
              value={this.state.navItem}
              onChange={this.handleNavChange.bind(this)}
              showLabels
              className={classes.nav}
            >
              <BottomNavigationAction label="New List" icon={<AddListIcon />} />
              <BottomNavigationAction label="My Lists" icon={<ListIcon />} />
              <BottomNavigationAction label="Signout" icon={<SignoutIcon />} />
            </BottomNavigation>
        }
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
