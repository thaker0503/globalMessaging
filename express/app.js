const express = require('express');
const router = express.Router();
const path = require('path');
// const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const { initializeApp } = require("firebase/app");
// const { getAnalytics } = require("firebase/analytics");
const { getDatabase, ref, set, get, child } = require("firebase/database");

const app = express();

const firebaseConfig = {
    apiKey: "AIzaSyAS07TATPZUshUMBORe4FUYQTn6kJeZCLM",
    authDomain: "global-chat-3ea31.firebaseapp.com",
    projectId: "global-chat-3ea31",
    storageBucket: "global-chat-3ea31.appspot.com",
    messagingSenderId: "885110726689",
    appId: "1:885110726689:web:ef75cadb07fb6a64638360",
    measurementId: "G-4H29YY356Z",
    databaseURL: "https://global-chat-3ea31-default-rtdb.firebaseio.com/"
};

const app1 = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app1)
// const database = getDatabase(app1);
// console.log(app1);
// console.log(database);
const db = getDatabase();

function writeUserData(name, email, password) {
    set(ref(db, 'users/' + name), {
        name,
        email,
        password
    })
}


app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    res.render(path.join(__dirname + '/views/index'))
});



router.post('/login', (req, res) => {
    let tmp = req.body.email.split('@')[0];
    let fname = tmp.split('.')[0]
    let lname = tmp.split('.')[1]
    let userDetails = {
        name: fname.charAt(0).toUpperCase()+fname.slice(1) + "-" + lname.charAt(0).toUpperCase()+lname.slice(1),
        email: req.body.email,
        password: req.body.password
    }
    // console.log(userDetails)
    // writeUserData(userDetails.name, userDetails.email, userDetails.password);
    // checkUser(userDetails.name)
    get(child(ref(db), `users/${userDetails.name}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            res.status(200).send({msg: snapshot.val()});
        } else {
            console.log("No data avaialable");
            res.send({msg: "No data avaialable"});
        }
    }).catch((error) => {
        console.error(error);
    });
    // res.send({ message: "Success" });
});


app.use('/', router);


module.exports = app;
