import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SigninIcon from '@material-ui/icons/ExitToApp';
import TasksIcon from '@material-ui/icons/ViewList';
import SignoutIcon from '@material-ui/icons/Block';
import SignupIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import { signoutUser } from '../actions/auth';

class NavList extends Component {
  onSignoutUser() {
    this.props.signoutUser(this.props.history);
  }

  render() {
    if (this.props.authenticated) {
      return (
        <div>
          <ListItem button>
            <ListItemIcon>
              <TasksIcon />
            </ListItemIcon>
            <ListItemText primary="My Tasks" />
          </ListItem>
          <ListItem button onClick={this.onSignoutUser.bind(this)}>
            <ListItemIcon>
              <SignoutIcon />
            </ListItemIcon>
            <ListItemText primary="Signout" />
          </ListItem>
        </div>
      );
    }

    return (
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/signin" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <SigninIcon />
            </ListItemIcon>
            <ListItemText primary="Signin" />
          </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon>
            <SignupIcon />
          </ListItemIcon>
          <ListItemText primary="Signup" />
        </ListItem>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
    authenticated: state.auth.authenticated
	};
};

export default connect(mapStateToProps, {
  signoutUser
})(NavList);
