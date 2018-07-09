import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import { createList } from '../actions/honeydew';
import { setAppBarTitle } from '../actions';

const styles = {
  defaultIcon: {
    margin: 10
  },
  selectedIcon: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  iconList: {
    marginTop: '20px'
  },
  iconLabel: {
    marginBottom: '10px'
  },
  button: {
    margin: '10px'
  }
};

class HoneydewListForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      icon: 'assignment'
    }
  }

  componentWillMount() {
    this.props.setAppBarTitle('Add New List', false);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeIcon = icon => {
    this.setState({ icon });
  }

  handleFormCancel = () => {
    this.props.history.push('/lists');
  }

  handleFormSubmit = () => {
    this.props.createList(this.state, this.props.history);
  }

  render() {
    const { classes } = this.props;
    const { icon } = this.state;

    return (
      <form className="container" noValidate autoComplete="off">
        <div className="row center-xs">
          <Paper elevation={1} className="col-xs-10" style={{marginTop: '70px'}}>
            <div className="row center-xs">
              <TextField
                id="name"
                label="List Name"
                className="col-xs-10"
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
            </div>

            <div className="row center-xs">
              <TextField
                id="description"
                label="Description"
                className="col-xs-10"
                multiline
                rows="4"
                value={this.state.description}
                onChange={this.handleChange('description')}
                margin="normal"
              />
            </div>

            <div className="row center-xs" style={styles.iconList}>
              <InputLabel htmlFor="icon-list" className="col-xs-12" style={styles.iconLabel}>
                Choose an icon
              </InputLabel>
              <div className="col-xs-3">
                <Avatar
                  className={icon === 'shopping-cart' ? classes.selectedIcon : classes.defaultIcon}
                  onClick={() => this.handleChangeIcon('shopping-cart')}
                >
                  <ShoppingCartIcon />
                </Avatar>
              </div>
              <div className="col-xs-3">
                <Avatar
                  className={icon === 'assignment' ? classes.selectedIcon : classes.defaultIcon}
                  onClick={() => this.handleChangeIcon('assignment')}
                >
                  <AssignmentIcon />
                </Avatar>
              </div>
              <div className="col-xs-3">
                <Avatar
                  className={icon === 'shopping-basket' ? classes.selectedIcon : classes.defaultIcon}
                  onClick={() => this.handleChangeIcon('shopping-basket')}
                >
                  <ShoppingBasketIcon />
                </Avatar>
              </div>
            </div>

            <div className="row center-xs">
              <Button
                className={classes.button}
                variant="contained"
                onClick={this.handleFormCancel}
              >
                Cancel
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={this.handleFormSubmit}
              >
                Submit
              </Button>
            </div>
          </Paper>
        </div>
      </form>
    )
  }
}

export default connect(null, {
  createList, setAppBarTitle
})(withStyles(styles)(HoneydewListForm));
