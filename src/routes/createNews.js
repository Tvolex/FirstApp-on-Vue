const config = require ('../config');
const mongodb = require ('mongodb');
const axios = require('axios');
const express = require ('express');
const getMaxID = require('./getMaxID');
const db_url = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

const createNews = router.post('/', async (req, res) => {
    let author = req.body.author;
    let title = req.body.title;
    let description = req.body.description;
    let img = req.body.img;

    const news = {
        author: author,
        title: title,
        description: description,
        img: img,
        createdAt: new Date(),
        watches: 0,
    };

    try {
        const db = await MongoClient.connect(db_url);
        const collection = db.collection('news');

        const result = await collection.insertOne(news);
        const ok = result.result.ok;

        console.log('createNews.js: Connection to db', db_url);

        db.close();

        ok === 1 ? res.status(201).send(true)
            :
            res.status(400).send(false);

    } catch (e) {
        res.status(500)
            .send(e);
    }






});
module.exports = createNews;