import { firebase, googleAuthProvider} from '../firebase/firebase';

/* LOGIN ACTIONS */

// Redux
export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

// Firebase
export const startLogin = () => {
  return () => {
      return firebase.auth().signInWithPopup(googleAuthProvider);
  }
};



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