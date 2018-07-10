import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const styles = theme => ({
  badge: {
    marginRight: '35px'
  },
});

class HoneydewListsItem extends Component {
  onItemClick(id) {
    this.props.history.push(`/lists/${id}`);
  }

  render() {
    const { classes } = this.props;
    const { uid, name, icon, updatedAt, items } = this.props.list;
    const itemCount = items ? Object.keys(items).length : 0;

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

    const updated = moment(updatedAt).format(
      'dddd, MMMM DD YYYY, h:mm:ss a'
    );

    return (
      <ListItem key={uid} onClick={() => { this.onItemClick(uid) }}>
        <Avatar>{avatarIcon}</Avatar>
        <ListItemText primary={name} secondary={updated} />
        <ListItemSecondaryAction>
          <Badge className={classes.badge}
            color="secondary"
            badgeContent={itemCount}
          >
            {''}
          </Badge>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

HoneydewListsItem.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {
  withTheme: true
})(HoneydewListsItem);
