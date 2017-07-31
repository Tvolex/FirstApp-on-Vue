const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const ObjectId = require('objectid');
const db_url = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

const deleteNews = router.post('/', async (req, res) => {
    let newsId = req.body._id;
    console.log("req id" +req.body._id);

    if (newsId) {
        const db = await MongoClient.connect(db_url);
        const collection = db.collection('news');

        const result = await collection.removeOne({_id: ObjectId(newsId)});

        result.result.ok === 1 ? res.status(200).send(result) :
            res.status(404).send(result);
    } else {
        res.status(400)
            .send('Bad request')
    }


});

module.exports = deleteNews;