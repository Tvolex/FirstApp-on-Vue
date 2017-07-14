const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const DBurl = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

const getNews = router.get("/getMaxID", (req, res) => {

    MongoClient.connect(DBurl, (err, db) => {
        if (err) {
            console.log('Unable to connect to the MongoDB server. Error:', err);
        } else {
            console.log('Connection to db', DBurl);
            const collection = db.collection('news');
            collection.find().sort({$natural: -1}).limit(1).next((e, result) => {
                if(!e) {
                    return result._id;
                } else {
                    return 'error';
                }
            });
        }
        db.close();
    });
});
module.exports = getNews;
