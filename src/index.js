import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import store from './store';
import { AUTH_USER, UNAUTH_USER } from './actions/types';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import './index.css';
import 'flexboxgrid/dist/flexboxgrid.css';

const history = createBrowserHistory();

// Check auth status and dispatch an action to set it in the store
const userId = localStorage.getItem('userId');
if (userId && userId !== '') {
  store.dispatch({ type: AUTH_USER });
} else {
  store.dispatch({ type: UNAUTH_USER });
}

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
  		<Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  </MuiThemeProvider> ,
  document.getElementById('root')
);

registerServiceWorker();
