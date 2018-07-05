import React from 'react';
import { Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home';
import SigninForm from './components/SigninForm';
import HoneydewLists from './components/HoneydewLists';
import HoneydewList from './components/HoneydewList';

const routes = (
	<div id="route-wrapper" style={{marginTop: '70px'}}>
		<Route path="/" component={Home} exact />
		<Route path="/signin" component={SigninForm} />
		<Route path="/lists" component={RequireAuth(HoneydewLists)} />
		<Route path="/lists/:id" component={RequireAuth(HoneydewList)} />
	</div>
);

export default routes;
