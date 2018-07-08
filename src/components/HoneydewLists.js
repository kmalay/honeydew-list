import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import SignoutIcon from '@material-ui/icons/NotInterested';
import { fetchLists } from '../actions/honeydew';
import { setAppBarTitle } from '../actions';
import { logoutUser } from '../actions/auth';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nav: {
    position: 'fixed',
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
        console.log('Delete this List');
        break;
      }
      case 2: {
        this.props.logoutUser();
        break;
      }
      default: {
        console.log('Add New List');
        break;
      }
    }
  };

  onItemClick(id) {
    // console.log('Item clicked: ', id);
    this.props.history.push(`/lists/${id}`);
  }

  renderListItems() {
    return this.props.lists.map((list, i) => {
      const { uid, name, icon, updatedAt } = list;

      let avatarIcon;
      switch(icon) {
        case "shopping-basket": {
          avatarIcon = (<ShoppingBasketIcon />);
          break;
        }
        case "shopping-cart": {
          avatarIcon = (<ShoppingCartIcon />);
          break;
        }
        default: {
          avatarIcon = (<AssignmentIcon />);
          break;
        }
      }

      const updated = moment(updatedAt).format('dddd, MMMM DD YYYY, h:mm:ss a');

      return (
        <ListItem key={i} onClick={() => { this.onItemClick(uid) }}>
          <Avatar>{avatarIcon}</Avatar>
          <ListItemText primary={name} secondary={updated} />
        </ListItem>
      )
    })
  }

  render() {
    // console.log('lists: ', this.props.lists);
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
            value="4"
            onChange={this.handleMenuClick.bind(this)}
            showLabels
            className={classes.nav}
          >
            <BottomNavigationAction label="New List" icon={<AddIcon />} />
            <BottomNavigationAction label="Delete this List" icon={<DeleteIcon />} />
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

	return {
    lists
	};
};

export default connect(mapStateToProps, {
  fetchLists, setAppBarTitle, logoutUser
})(withStyles(styles, { withTheme: true })(HoneydewLists));
