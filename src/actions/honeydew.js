import _ from 'lodash';
import firebase from 'firebase';
import axios from 'axios';

import {
  FETCH_LISTS,
  CREATE_LIST,
  FETCH_LIST,
  CREATE_LIST_ITEM,
  TOGGLE_ITEM_COMPLETED,
  RESET
} from './types';

const sendNotification = (message) => {
  if (message && message !== '') {
    console.log('sendNotification: ', message);
    const url = 'https://fcm.googleapis.com/fcm/send';

    const opts = { headers: { Authorization: `key=AIzaSyCAHLi71uZQramslnp6gr2GmtziMnTn1Q8` }};
    const body = {
      to : '/topics/admin',
      priority : 'high',
      data: { text: message, title: 'Honeydew' }
    };
    axios.post(url, body, opts)
      // .then(response => { console.log(response.data); })
      .catch(err => { console.log('Error: ', err) });
  }
};

  // TODO:
  // - Send notification if:
  //   - New list is created: /lists child_added
  //   - New list item created: /lists/${uid} child_added

export const fetchLists = () => {
	return (dispatch) => {
		firebase.database().ref('/lists')
			.on('value', snapshot => {
				dispatch({
					type: FETCH_LISTS,
					payload: snapshot.val()
				});
			});

    firebase.database().ref('/lists')
      .on('child_added', snapshot => {
        sendNotification('A new list has been added.');
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

    firebase.database().ref(`/lists/${uid}`)
      .on('child_added', snapshot => {
        const listName = snapshot.val().name;
        sendNotification(`A new item was added to ${listName}.`);
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
