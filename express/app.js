const express = require('express');
const router = express.Router();
const path = require('path');
const { v4: uuid } = require('uuid');
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

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
// const database = getDatabase(app1);
console.log(app1);
// console.log(database);

function writeUserData(userId, name, email, password) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        name,
        email,
        password
    })
}

// writeUserData(uuid(), 'yatharth', 'yatharth.thaker@technostacks.com', '123')

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));

router.get('/', (req, res) => {
    res.render(path.join(__dirname + '/views/index'))
});

app.use('/', router);

// app.listen(port, () => {
//     console.log(`App running on http://localhost:${port}`);
// });

module.exports = app;
