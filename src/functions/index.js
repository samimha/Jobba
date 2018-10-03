// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:userId/
exports.addMessage = functions.https.onRequest((req, res) => {

  const original = req.body;
  let currentRating;
  let currentScore;

  admin.database().ref('messages/'+original.userID).on("value", function(snapshot) {
    currentRating = snapshot.child("rating").val();
    currentRating = currentRating + 1;
    currentScore = snapshot.child("score").val();
    currentScore = currentScore + original.score;
  });
  

  admin.database().ref('messages/'+original.userID).update({score:(currentScore),rating:(currentRating)});
  return res.send("current rating: "+ currentScore/currentRating);

  //admin.database().ref('messages').push(original);

  /* admin.database().ref('messages').once("value").then(function(snapshot){
      let a = snapshot.child("name").key;
      if (original=="moro"){
          a="";
        snapshot.forEach(function (childSnapshot){
            a= a+childSnapshot.key;

        });
    } else if (original=="moro2"){
        a = snapshot.child("name").val();
    } else if (original=="moro3"){
        a = snapshot.child().val();
    }
    let paluu = res.send(a);
    return paluu;
  }); */

  admin.database().ref('messages').on("value", function(snapshot) {
    return res.send(snapshot.val());
  });


});

/* // Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('messages/{pushId}/original')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    }); */
