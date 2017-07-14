const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const db_url = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

const getNews = router.get("/", (req, res) => {

    let lastDate = req.query.lastDate;

        MongoClient.connect(db_url, (err, db) => {
            if (err) {
                console.log('Unable to connect to the MongoDB server. Error: ', err);
                res.status(err.status)
                    .send(err);
            } else {
                const collection = db.collection('news');
                console.log('Connection to db ', db_url);
                //{createdAt: {$gt: lastDate}}
                collection.find({createdAt: {$gt : new Date(lastDate)}}).sort({$natural: -1}).toArray((e, doc) => {
                    db.close();
                    if(doc) {
                        res.status(200)
                            .send(doc);
                    } else {
                        res.status(e)
                            .send(e);
                    }
                });
            }
        });
});
module.exports = getNews;
