const config = require ('./config');
const express = require ('express');
const bodyParser = require ('body-parser');
const session = require ('express-session');
const cookieParser = require ('cookie-parser');
const path = require ('path');
const app = express();

const login = require ('./routes/login');
const Authorization = require ('./routes/Authorization');
const AuthFD = require ('./routes/AuthForDesktop');
const Register = require ('./routes/Register');
const MyOffice = require ('./routes/MyOffice');
const deleteAcc = require ('./routes/deleteAcc');
const change = require ('./routes/change');
const getNews = require('./routes/getNews');
const createNews = require('./routes/createNews');
const deleteNews = require('./routes/deleteNews');
const deleteS = require ('./routes/deleteS');
const getPhoto = require ('./routes/getPhoto');
const randomPhoto = require('./routes/randomPhoto');


app.use(cookieParser());
app.use(bodyParser());
app.use(session({
    secret: 'F5AWd2aW8F1cW2W8GGT8xzWt6c',
    resave: true,
    saveUninitialized: true
}));



// view engine setup
app.set('views', path.join(__dirname, '../view'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
//noinspection JSUnresolvedVariable
app.use(express.static(path.join(__dirname, '../public')));

// Render pages
app.get('/' || '/index' , (req,res)=>{
    res.render("index");
});
app.get('/Enter', (req,res)=>{
    res.render("Enter");
});
app.get('/AboutUs', (req,res)=>{
    res.render("AboutUs");
});
app.get('/setting', (req,res)=>{
    res.render("Setting");
});
app.get('/randomImages', (req,res)=>{
    res.render("RandomImages");
});
app.get('/news', (req, res) => {
    res.render('news1');
});
app.get('/news1', (req, res) => {
    res.render('news1');
});
app.get('/vue', (req, res) => {
    res.render('vue');
});

app.use('/getNews', getNews);
app.use('/createNews', createNews);
app.use('/deleteNews', deleteNews);
app.use('/MyOffice', MyOffice);
app.use('/Authorization', Authorization);
app.use('/AuthForDesktop', AuthFD);
app.use('/Register', Register);
app.use('/login', login);
app.use('/deleteAcc', deleteAcc);
app.use('/change', change);
app.use('/delete', deleteS);
app.use('/photo/', getPhoto);
app.use('/random', randomPhoto);

// Errors
app.use((req, res, next) => {
    res.status(404)
        .send('<h1 align="center">Not Found 404</h1>')
});

app.listen(config.port, () => {
    console.log('Server start on port ' + config.port);
   
});
module.exports = app;

