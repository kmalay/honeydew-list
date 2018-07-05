import _ from 'lodash';
import firebase from 'firebase';

import {
  FETCH_LISTS,
  CREATE_LIST,
  FETCH_LIST,
  CREATE_LIST_ITEM,
  TOGGLE_ITEM_COMPLETED,
  RESET
} from './types';

export const fetchLists = () => {
	return (dispatch) => {
		firebase.database().ref('/lists')
			.on('value', snapshot => {
				dispatch({
					type: FETCH_LISTS,
					payload: snapshot.val()
				});

        // Maybe a push notification here in case a new list has been created
			});
	};
};

export const createList = ({ name, description, icon }, history) => {
	const { currentUser } = firebase.auth();
  const updatedAt = new Date();

  const list = {
    name, description, icon,
    user: currentUser.uid,
    updatedAt: updatedAt.getTime(),
    items: []
  };

	return (dispatch) => {
		firebase.database().ref('/lists')
			.push(list)
			.then(() => {
				dispatch({ type: CREATE_LIST });
				history.push('/lists');
			});
	};
};

export const fetchList = (uid, history) => {
  return (dispatch) => {
    firebase.database().ref(`/lists/${uid}`)
      .on('value', snapshot => {
        if (snapshot.val() === null) {
          dispatch({ type: RESET });
          history.push('/lists');
        } else {
          dispatch({
            type: FETCH_LIST,
            payload: snapshot.val()
          });
        }
      });
  };
};

export const createListItem = (uid, title) => {
  return (dispatch) => {
    const item = {
      title,
      completed: false
    };

    const newKey = firebase.database().ref(`/lists/${uid}`).child('items').push().key;

    let updates = {};
    updates[`/lists/${uid}/items/${newKey}`] = item;

    firebase.database().ref().update(updates)
      .then(() => {
        dispatch({
          type: CREATE_LIST_ITEM
        });
      });
  };
};

export const toggleItemCompleted = (listId, itemId, title, completed) => {
  return (dispatch) => {
    const item = {
      title,
      completed: !completed
    };

    let updates = {};
    updates[`/lists/${listId}/items/${itemId}`] = item;

    firebase.database().ref().update(updates)
      .then(() => {
        dispatch({
          type: TOGGLE_ITEM_COMPLETED
        });
      });
  };
};

export const clearCompleted = (listId) => {
  return (dispatch) => {
    firebase.database().ref(`/lists/${listId}/items`).once('value')
      .then((snapshot) => {
        _.forOwn(snapshot.val(), (value, key) => {
          if (value.completed === true) {
            firebase.database().ref(`/lists/${listId}/items/${key}`).remove();
          }
        });
      });
  };
};

export const deleteList = (listId, history) => {
  return (dispatch) => {
    let updates = {};
    updates[`/lists/${listId}`] = null;

    firebase.database().ref().update(updates)
      .then(() => {
        history.push('/lists');
      });
  };
};