import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Snackbar from '@material-ui/core/Snackbar';
// import Button from '@material-ui/core/Button';

import { closeSnackbar, showSnackbar } from '../actions';
import { signoutUser } from '../actions/auth';
import routes from '../routes';
import NavList from './NavList';

const drawerWidth = 220;

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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 12,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.history.push('/tasks');
    }
  }

  handleSnackbarClose() {
    this.props.closeSnackbar();
  }

  onSignout(e) {
    e.preventDefault();
    this.props.signoutUser(this.props.history);
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { open } = this.state;
    const {
      title, snackBarOpen, snackBarMessage, history,
      snackBarAutoHideDuration, classes
    } = this.props;

    const drawer = (
      <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
      >
        <div className={classes.drawerHeader} />
        <List><NavList history={history}/></List>
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar disableGutters={true}>
              <IconButton
                color="inherit"
                aria-label="Toggle drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
          <main
            className={classNames(classes.content, classes['content-left'], {
              [classes.contentShift]: open,
              [classes['contentShift-left']]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            {routes}
            <Snackbar
              open={snackBarOpen}
              message={snackBarMessage}
              autoHideDuration={snackBarAutoHideDuration}
              onRequestClose={this.handleSnackbarClose.bind(this)}
            />
          </main>
        </div>
      </div>
    );

    // return (
		// 	<div className={classes.root}>
    //     <AppBar position="static">
    //       <Toolbar>
    //         <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
    //           <MenuIcon />
    //         </IconButton>
    //         <Typography variant="title" color="inherit" className={classes.flex}>
    //           {title}
    //         </Typography>
    //         <Button color="inherit">Login</Button>
    //       </Toolbar>
    //       <Snackbar
    //        open={snackBarOpen}
    //        message={snackBarMessage}
    //        autoHideDuration={snackBarAutoHideDuration}
    //        onRequestClose={this.handleSnackbarClose.bind(this)}
    //       />
    //     </AppBar>
    //     { routes }
		// 	</div>
		// );
  }
}

// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   flex: {
//     flex: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };

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
  closeSnackbar, signoutUser, showSnackbar
})(withStyles(styles, { withTheme: true })(App));
