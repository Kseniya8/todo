const express = require('express');
const mongoose = require('mongoose');
const expHbs = require('express-handlebars');
const todoRouts = require('./routes/todos');
const path = require('path');

const http = require('http'); //подключение модуля
const port = process.env.port || 8000; //порт для прослушивания входящих сообщений (системная переменная)

const app = express(); //объект приложения
const hbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs' //сокращаем имя
});

app.engine('hbs', hbs.engine); //регистрируем движок
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

app.use(todoRouts);

async function Start() {
    try {
        await mongoose.connect('mongodb+srv://senya4077:senya4077@cluster0.a57d3.mongodb.net/myFirstDatabase', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(port, () => {
            console.log('Server has been started.');
        });
    }
    catch (e) {
        console.log(e);
    }
};

Start();

