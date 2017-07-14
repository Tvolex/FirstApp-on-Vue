const config = require ('../config');
const mongodb = require ('mongodb');
//const async = require('async');
const express = require ('express');
const getMaxID = require('./getMaxID');
const db_url = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;



const createNews = router.post('/', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;

    const news = {
        "title": title,
        "description": description,
        "createdAt": new Date(),
        "watches": 0,
    };

    MongoClient.connect(db_url, (error, db) => {
        console.log('Connection to db', db_url);

        if (error) {
            console.log(error);
            res.status(error.status)
                .send(error);
        } else {
            const collection = db.collection('news');
            collection.insertOne(news, (err, result) => {
                db.close();
                let ok = result.result.ok;
                if(err) {
                    console.log(err);
                    res.status(err.status)
                        .send(err);
                } else if (ok === 1) {
                    res.status(201)
                        .send(true)
                } else {
                    res.status(400)
                        .send(false);
                }
            });
        }
    })
});

module.exports = createNews;