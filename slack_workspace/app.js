'use strict';

const { App } = require('@slack/bolt');
const bodyParser = require('body-parser');
require('dotenv').config();

const express = require('express');

const express_app = express();
express_app.use(bodyParser.json());
express_app.use(bodyParser.urlencoded({extended:true}));

express_app.post

express_app.post('/help', (req, res) => {
    res.send('nahi batauga');
});


// add user event


// search user api




express_app.post('/test', (req,res) => {
    res.send(req.body.text +' Ganda hai');
});

express_app.post('/search_user', (req, res) => {

});

const server2 = express_app.listen(5000, () => {
    console.log('server 5000 active');
})


const app = new App({
    token : process.env.SLACK_APP_TOKEN_ID,
    signingSecret : process.env.SIGNING_SECRET
});

app.event('app_home_opened', ({event, say}) => {
    console.log("bot started successfully");
    say(`bot here  , <@${event.user}>!`);
});

(async () =>{
    await app.start(3000);
    console.log(process.env.SLACK_APP_TOKEN_ID)
    console.log("Bot Active at 3000");
})();