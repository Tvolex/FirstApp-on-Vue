const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const ObjectId = require ('objectid');
const db_url = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;


function asyncWrap(fn) {
    return (req, res, next) => {
        fn(req, res, next);
    }
}

const getNews = router.get("/", async function (req, res) {
    let lastDate = req.query.lastDate;
    let author = req.session.user_id;

    try {
        const db = await MongoClient.connect(db_url);
        const collection = db.collection('users');
        //let items = await collection.find({createdAt: {$gt : new Date(lastDate)}}).sort({$natural: -1}).toArray();
        let items = await collection.aggregate([{
            $lookup: {
                from: "news",
                localField: "_id",
                foreignField: author,
                as: "item"
            },
        }, {
            $unwind: "$item",
        }, {
            $project: {
                title: 1, description: 1, author: 1, img: 1, createdAt: 0, _id: 0
            }
        }, {
            createdAt: {
                $gt : new Date(lastDate)
            }
        }
        ]).toArray();
        console.log('getNews.js: Connection to db', db_url);

        db.close();

        res.status(200)
            .send(items)

    } catch (e) {
        console.log(e);
        res.status(500)
            .send(e);
    }
});

module.exports = getNews;
