const config = require ('../config');
const ObjectId = require('objectid');
const mongodb = require ('mongodb');
const express = require ('express');
const db_url = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

const deleteNews = router.post('/', (req, res) => {
    let newsId = req.body._id;
    console.log(req.body._id);
    MongoClient.connect(db_url, (error, db) => {
        if(error) {
            console.log(error);
            res.status(error.status)
                .send(error);
        } else {
            const collection = db.collection('news');
            collection.removeOne({_id: ObjectId(newsId)}, ((err, result) => {
                if(!err) {
                    console.log(result.result.ok);
                    res.status(200)
                        .send(result);
                }
            }))
        }
    })
});

module.exports = deleteNews;