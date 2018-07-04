import axios from 'axios';
import {
	AUTH_USER,
	AUTH_ERROR,
	UNAUTH_USER
} from './types';

const baseUrl = 'http://localhost:4000/v1';

export const signinUser = ({ username, password }, history) => {
	return (dispatch) => {
		const url = `${baseUrl}/auth/signin`;
		const body = { userName: username, password };
		const opts = {};

		axios.post(url, body, opts)
			.then(response => {
				const { userId, token } = response.data;
				localStorage.setItem('userId', userId);
				localStorage.setItem('token', token);
				dispatch({ type: AUTH_USER });
				history.push('/tasks');
			})
			.catch(err => {
				console.log('Login error: ', err);
				dispatch({
					type: AUTH_ERROR,
					payload: err.message
				});
			});
	};
};

export const signoutUser = (history) => {
	return (dispatch) => {
		console.log('signout clicked!', history);
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		dispatch({ type: UNAUTH_USER });
		history.push('/');
	};
};
