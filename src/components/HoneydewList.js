import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AddItemIcon from '@material-ui/icons/AddCircleOutline';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckedIcon from '@material-ui/icons/CheckBox';
import UncheckedIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/DeleteSweep';
import ListsIcon from '@material-ui/icons/ViewList';
import SignoutIcon from '@material-ui/icons/NotInterested';
import { setAppBarTitle } from '../actions';
import { logoutUser } from '../actions/auth';
import {
  fetchList, createListItem, toggleItemCompleted
} from '../actions/honeydew';

const styles = theme => ({
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%'
  }
});

class HoneydewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: ''
    }
  }

  componentWillMount() {
    this.props.fetchList(
      this.props.match.params.id,
      this.props.history
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name) {
      this.props.setAppBarTitle(this.props.name, true);
    }
  }

  handleMenuClick = (event, value) => {
    switch(value) {
      case 1: {
        console.log('Clear Completed');
        break;
      }
      case 2: {
        this.props.history.push('/lists');
        break;
      }
      case 3: {
        this.props.logoutUser();
        break;
      }
      default: {
        console.log('Delete List');
        break;
      }
    }
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownAddItem = event => {
    event.preventDefault();
  };

  handleClickAddItem = () => {
    const { newItem } = this.state;

    if (newItem) {
      this.props.createListItem(
        this.props.match.params.id,
        newItem
      );
    }
  }

  handleToggleItemCompleted(itemId, title, completed) {
    this.props.toggleItemCompleted(
      this.props.match.params.id,
      itemId,
      title,
      completed
    );
  }

  renderListItems() {
    return this.props.items.map((item, i) => {
      const { uid, title, completed } = item;
      const icon = completed ? (<CheckedIcon />) : (<UncheckedIcon />);
      const textStyle = {
        textDecorationLine: completed ? 'line-through' : 'none'
      };

      return (
        <ListItem
          key={i}
          style={textStyle}
          onClick={() => { this.handleToggleItemCompleted(uid, title, completed) }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      )
    })
  }

  render() {
    const { classes } = this.props;
    // console.log(this.props.items);

    return (
      <div className="container">
        <div className="row center-xs"
          style={{position: 'fixed', left: 0, right: 0, zIndex: 10}}
        >
          <div className="col-xs-12">
            <Paper elevation={1}>
              <FormControl>
                <InputLabel htmlFor="add-list-item">Add List Item</InputLabel>
                <Input
                  id="add-list-item"
                  type="text"
                  value={this.state.newItem}
                  onChange={this.handleChange('newItem')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Add List Item"
                        onClick={this.handleClickAddItem}
                        onMouseDown={this.handleMouseDownAddItem}
                      >
                        <AddItemIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Paper>
          </div>
        </div>

        <div className="row" style={{marginBottom: '70px'}}>
          <div className="col-xs-12">
            <Paper elevation={1} style={{marginTop: '50px'}}>
              <List>
                {this.renderListItems()}
              </List>
            </Paper>
          </div>
        </div>

        <div className="row">
          <BottomNavigation
            value="5"
            onChange={this.handleMenuClick.bind(this)}
            showLabels
            className={classes.nav}
          >
            <BottomNavigationAction label="Delete List" icon={<DeleteIcon />} />
            <BottomNavigationAction label="Clear Completed" icon={<ClearIcon />} />
            <BottomNavigationAction label="My Lists" icon={<ListsIcon />} />
            <BottomNavigationAction label="Signout" icon={<SignoutIcon />} />
          </BottomNavigation>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
	const items = _.map(state.honeydew.items, (val, uid) => {
		return { ...val, uid };
	});

	return {
    items,
    name: state.honeydew.name
  };
};

export default connect(mapStateToProps, {
  fetchList, createListItem, toggleItemCompleted, setAppBarTitle, logoutUser
})(withStyles(styles, { withTheme: true })(HoneydewList));
