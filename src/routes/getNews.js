const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const ObjectId = require ('objectid');
const db_url = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;


const getNews = router.get("/", async function (req, res) {
    let lastDate = req.query.lastDate;
    let author = req.session.user_id;

    try {
        const db = await MongoClient.connect(db_url);
        const collection = db.collection('news');
        let items = await collection.find({createdAt: {$gt : new Date(lastDate)}}).sort({$natural: -1},).toArray();

        console.log('getNews.js: Connection to db', db_url);
        console.log(items);
        db.close();

        res.status(200)
            .send(items)

    } catch (e) {
        console.log(e);
        res.status(500)
            .send({error: e});
    }
});

module.exports = getNews;
