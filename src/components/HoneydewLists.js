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
import { fetchLists } from '../actions/honeydew';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  }
});

class HoneydewLists extends Component {
  componentWillMount() {
    this.props.fetchLists();
  }

  onItemClick(id) {
    console.log('Item clicked: ', id);
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

    return (
      <div className="row">
        <div className="col-xs-12">
          <Paper elevation={1}>
            <List>
              {this.renderListItems()}
            </List>
          </Paper>
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
  fetchLists
})(withStyles(styles, { withTheme: true })(HoneydewLists));
