import firebase from 'firebase';

import {
	AUTH_USER,
	AUTH_ERROR,
	UNAUTH_USER
} from './types';

export const loginUser = ({ email, password }, history) => {
	return (dispatch) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(result => {
				const { user } = result;

				localStorage.setItem('userId', user.uid);
				localStorage.setItem('email', user.email);

				dispatch({ type: AUTH_USER });

				history.push('/lists');
			})
			.catch((error) => {
				console.log('Login error: ', error);

				dispatch({
					type: AUTH_ERROR,
					payload: error.message
				});
			});
	};
};

export const logoutUser = (history) => {
	return (dispatch) => {
		firebase.auth().signOut()
			.then(() => {
				localStorage.removeItem('userId');
				localStorage.removeItem('email');

				dispatch({ type: UNAUTH_USER });

				window.location.reload();
			})
			.catch(error => {
				console.log('Error signing out: ', error.message);
			});
	};
};
