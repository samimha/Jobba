import database from '../firebase/firebase';

// Add User
export const addUser = (user) => ({
    type: 'ADD_USER',
    user
});

export const startAddUser = (userData = {}) => {
    return (dispatch) => {
        const {
            uid = '',
            displayName = ''
        } = userData;
        
        //const user = { uid, displayName };
        //console.log('->' + database.ref('users'));

        var userRef = firebase.database().ref('users/'+uid);
        userRef.transaction(function (currentData) {
            if (currentData === null) {
                return { name: displayName };
            } else {
                console.log('User already exists.');
                return; // Abort the transaction.
            }
        }, function (error, committed, snapshot) {
            if (error) {
                console.log('Transaction failed abnormally!', error);
            } else if (!committed) {
                console.log('We aborted the transaction (because same data already exists).');
            } else {
                console.log('User added!');
            }
            //console.log("Ada's data: ", snapshot.val());
        });

        // database.ref('users').push(user).then((ref) => {
        //         console.log(user);
        //         dispatch(addUser({
        //             id: ref.key,
        //             ...user
        //         }));
        //     }).catch((e) => {
        //         console.log('Error ocurred.', e);
        //     });
    };
};

// Remove User
export const removeUser = (id = {}) => ({
    type: 'REMOVE_USER',
    id
});

export const startRemoveUser = ({ id }) => {
    return (dispatch) => {
        database.ref('users/' + id).remove().then(() => {
            dispatch(removeUser(id));
        }).catch((e) => {
            console.log('Error occurred.', e);
        });
    };
};