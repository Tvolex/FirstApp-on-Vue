const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');

const DBurl = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

const login = router.get('/', async(req, res) => {
    const Session = {};
    Session.id = req.session.id;
    Session.UserEmail = req.session.user_email;

    try {
        const db = await MongoClient.connect(DBurl);
        const collection = db.collection("users");
        const doc = await collection.find({"UserEmail" : Session.UserEmail, "SessionID" : req.session.id}).limit(1).next();

        console.log("login.js: Connection to db: " + DBurl);

        db.close();

        if (doc)
            res.status(200)
                .cookie('btnExit', true)
                .json({login: true});
        else
            res.status(401)
                .clearCookie('btnExit')
                .json({login: false});
    } catch (e) {
        res.status(500)
            .clearCookie('btnExit')
            .json({error: e, login: false});
    }


});

module.exports = login;