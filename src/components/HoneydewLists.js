import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/AddBox';
import SignoutIcon from '@material-ui/icons/NotInterested';
import { fetchLists } from '../actions/honeydew';
import { setAppBarTitle } from '../actions';
import { logoutUser } from '../actions/auth';
import HoneydewListsItem from './HoneydewListsItem';
import Animate from './Animate';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nav: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});

class HoneydewLists extends Component {
  componentWillMount() {
    this.props.setAppBarTitle('Honeydew Lists', false);
    this.props.fetchLists();
  }

  handleMenuClick = (event, value) => {
    switch(value) {
      case 1: {
        this.props.logoutUser();
        break;
      }
      default: {
        this.props.history.push('/list/new');
        break;
      }
    }
  };

  renderListItems() {
    return this.props.lists.map((list, i) => {
      return (
        <HoneydewListsItem key={i} list={list} history={this.props.history} />
      )
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <Paper elevation={1}>
              <List>
                {this.renderListItems()}
              </List>
            </Paper>
          </div>
        </div>

        <div className="row">
          <BottomNavigation
            value="3"
            onChange={this.handleMenuClick.bind(this)}
            showLabels
            className={classes.nav}
          >
            <BottomNavigationAction label="New List" icon={<AddIcon />} />
            <BottomNavigationAction label="Signout" icon={<SignoutIcon />} />
          </BottomNavigation>
        </div>
      </div>
    )
  }
}

HoneydewLists.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const lists = _.map(state.honeydew.lists, (val, uid) => {
		return { ...val, uid };
	});

	return { lists };
};

export default connect(mapStateToProps, {
  fetchLists, setAppBarTitle, logoutUser
})(withStyles(styles, { withTheme: true })(Animate(HoneydewLists)));
