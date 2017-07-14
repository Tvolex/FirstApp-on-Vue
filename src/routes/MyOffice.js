const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');

const DBurl = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

var MyOffice = router.get('/',(req,res)=>{

    var Session = {};
    var req = req;
    Session.id = req.session.id;
    Session.UserEmail = req.session.UserEmail;

    try {
        MongoClient.connect(DBurl, (err, db) => {
            if(err) {
                console.log("Error", err);
            } else {
                console.log("Connection to db: " + DBurl);
                var collection = db.collection("users");
                collection.find({"UserEmail" : Session.UserEmail, "SessionID" : req.session.id}).limit(1).next((err, doc) => {
                    if(err) {
                        console.log("Error : " + err);
                    } else if(doc) {
                        var options = {
                            Name: doc.RealName,
                            Surname: doc.RealSurName,
                            Email: doc.UserEmail
                        };
                        res.cookie('btnExit', true)
                            .status(200)
                            .render("MyOffice",options);
                    } else {
                        res.clearCookie('btnExit')
                            .status(401)
                            .render('Enter');
                    }

                    db.close();
                });
            }
        });
    } catch (e) {
        console.log(e);
        res.status(400);
    }
});
module.exports = MyOffice;