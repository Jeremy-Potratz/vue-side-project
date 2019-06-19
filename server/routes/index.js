var admin = require('firebase-admin');
//var app = admin.initializeApp();
//var provider = new firebase.auth.GoogleAuthProvider();
const router = require('express').Router()
//const firebase = require('firebase');
//const functions = require('firebase-functions');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

//var token = new Boolean(false);

var serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://CS-252-WebApp.firebaseio.com'
});
//authentication function for Google

var db = admin.firestore();
var users = db.collection('users');

router.post('/login', (req, res) => {
	var user = req.body.username[0]
	var password = req.body.username[1]

		users.where('username', '==', user).get()
			.then(snapshot => {
        snapshot.forEach(doc => {

                  if(password == doc.data().password){
                    localStorage.setItem('user', user);
                    return res.redirect("http://localhost:3001/home");
                  }else{
                    localStorage.setItem('user', "");
                    return res.json("Wrong password, go back and try again.")

                  }
                })

              				});
if(localStorage.getItem('user') != user){
  localStorage.setItem('user', "");
  return res.redirect("http://localhost:3001/realSignIn");
}
});

router.post('/getActs', (req, res, next) => {
  users.where('username', '==', localStorage.getItem('user')).get()
    .then(snapshot => {
      snapshot.forEach(doc => {

        res.json({
          user: localStorage.getItem('user'),
          acts: doc.data().jobs,
          loggedIn: true,
        })
        return res.redirect("http://localhost:3001/home");

      })
    });
});

router.post('/addAct', (req, res, next) => {
  var userRef = users.doc(localStorage.getItem('user'));
  var jobArray = [];
  //console.log(localStorage.getItem('user'));

  users.where('username', '==', localStorage.getItem('user')).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        //in here store password and username as local variables as well as jobs so that we can save
        //again down there then show them
              jobArray = doc.data().jobs;
              jobArray.push(req.body.username)

              var u = {};
              u["username"] = doc.data().username;
              u["password"] = doc.data().password;
              u["jobs"] = jobArray;


              userRef.set(u);
              res.redirect("http://localhost:3001/home");

})});



});


router.post('/auth', (req, res, next) => {

console.log(req.body.username[0]);
console.log(req.body.username[1]);

localStorage.setItem('user', req.body.username[0]);
var u = {};
u["username"] = req.body.username[0];
u["password"] = req.body.username[1];
u["jobs"] = [];

users.doc(req.body.username[0]).set(u)
res.redirect("http://localhost:3001/home");

});

router.post('/signOut', (req, res, next) => {
localStorage.setItem('user', "");
res.redirect("http://localhost:3001/realsignin");
})


