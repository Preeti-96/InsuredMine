const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api.route');

const app = express();

mongoose.connect("mongodb://localhost:27017/insuredMine", {
    user: "insuredMine",
    pass: "insuredMine",
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        console.log('Failed to connect to Database :' + err);
    } else {
        console.log('Database connection successful');
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);


module.exports = app;
