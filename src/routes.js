import React from 'react';
import { Route } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import Home from './components/Home';
import SigninForm from './components/auth/SigninForm';
import HoneydewLists from './components/tasks/HoneydewLists';
import HoneydewList from './components/tasks/HoneydewList';

const routes = (
	<div id="route-wrapper" style={{marginTop: '70px'}}>
		<Route path="/" component={Home} exact />
		<Route path="/signin" component={SigninForm} />
		<Route path="/lists" component={RequireAuth(HoneydewLists)} />
		<Route path="/lists/:id" component={RequireAuth(HoneydewList)} />
	</div>
);

export default routes;
