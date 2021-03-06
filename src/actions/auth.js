import { firebase, googleAuthProvider} from '../firebase/firebase';

/* LOGIN ACTIONS */

// Redux
export const login = (user) => ({
    type: 'LOGIN',
    user
});

// Firebase
export const startLogin = () => {
  return () => {
      return firebase.auth().signInWithPopup(googleAuthProvider);
  }
};

export const getUserID = () =>  ({
    type: 'USER_ID'
});


/* LOGOUT ACTIONS*/

// Redux
export const logout = () => ({
    type: 'LOGOUT'
});

// Firebase
export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    }
};