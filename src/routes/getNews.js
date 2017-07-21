const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const db_url = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;


function asyncWrap(fn) {
    return (req, res, next) => {
        fn(req, res, next);
    }
}

const getNews = router.get("/", asyncWrap(async function(req, res) {
    let lastDate = req.query.lastDate;

    try {
        const db = await MongoClient.connect(db_url);
        const collection = db.collection('news');
        let items = await collection.find({createdAt: {$gt : new Date(lastDate)}}).sort({$natural: -1}).toArray();

        console.log('getNews.js: Connection to db', db_url);

        db.close();

        res.status(200)
            .send(items)

    } catch (e) {
        res.status(500)
            .send(e);
    }

}));

module.exports = getNews;
