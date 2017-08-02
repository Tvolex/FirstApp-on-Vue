const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');

const DBurl = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

async function FindUser(UserEmail, UserPassword, sessionId) {
    const db = await MongoClient.connect(DBurl);
    const collection = db.collection('users');
    const doc = await collection.find({"UserEmail": UserEmail, "password": UserPassword}).limit(1).next();

    if(doc)
        collection.updateOne({"UserEmail": UserEmail}, {$set: {"SessionID" : sessionId}});

    console.log('Authorization.js: Connection to db', DBurl);
    db.close();
    return doc;
}

const Auth = router.post("/", async (req, res) => {

    const User = {};
    User.email = req.body.UserEmail;
    User.password = req.body.password;
    User.sessionID = req.sessionID;

    let doc;

    try {
        doc = await FindUser(User.email, User.password, User.sessionID);

        if (doc) {
            req.session.user_id = doc._id;
            req.session.user_email = User.email;
            console.log(req.session);

            res.status(200)
                .cookie('btnExit', true)
                .send(doc);
        } else {
            res.status(401)
                .cookie('btnExit', false)
                .send(doc);
        }

    } catch (e) {
        console.log("Authorization.js: Error: ", e);
        res.status(500)
            .send('server error');
    }





    // try {
    //     MongoClient.connect(DBurl, (err, db) => {
    //         if (err) {
    //             console.log('Unable to connect to the MongoDB server. Error:', err);
    //         } else {
    //             console.log('Connection to db', DBurl);
    //             const collection = db.collection('users');
    //             collection.find({"UserEmail": UserEmail, "password": UserPassword}).limit(1).next((err, doc) => {
    //                 console.log(doc);
    //                 if (err) {
    //                     console.log(err);
    //                 } else if(doc) {
    //                     console.log("found user");
    //                     req.session.UserEmail = UserEmail;
    //                     collection.updateOne({"UserEmail": UserEmail}, {$set: {"SessionID" : req.sessionID}});
    //                     res.cookie('btnExit', true)
    //                         .status(200)
    //                         .send(User)
    //                 } else if(!doc) {                                                                  // в бд немає такого юзера
    //                     console.log("not found user");
    //                     res.status(401)
    //                         .cookie('btnExit', false)
    //                         .send(User)
    //                         .end();
    //                 }
    //                 db.close();
    //             });
    //         }
    //     });
    // } catch (e){
    //     res.send(e.status);
    //     res.end();
    // }
});

module.exports = Auth;