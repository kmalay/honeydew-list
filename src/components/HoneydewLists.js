import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
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

  renderListItems() {
    return this.props.lists.map((list, i) => {
      const { name, updatedAt } = list;

      return (
        <ListItem key={i}>
          <Avatar>
            <ImageIcon />
          </Avatar>
          <ListItemText primary={name} secondary={updatedAt} />
        </ListItem>
      )
    })
  }

  render() {
    // const { classes } = this.props;

    console.log('lists: ', this.props.lists);

    return (
      <div className="row">
        <div className="col-xs-12">
          <List>
            {this.renderListItems()}
          </List>
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
