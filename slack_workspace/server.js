require('dotenv').config();

const {createServer} = require('http');
const express = require('express');
const {createMessageAdapter} = require('@slack/interactive-messages');
const {createEventAdapter} = require('@slack/events-api');
const {WebClient} = require('@slack/web-api');

const axios = require('axios');
const bodyParser = require('body-parser');
const { response } = require('express');
const controller = require('./routes/controller');
const slackSlashController = require('./routes/slashCommand/slashController');

// Creating adapters
const slackSigningSecret = process.env.SIGNING_SECRET;
const slackAccessToken = process.env.SLACK_APP_TOKEN_ID;

const slackEvents = createEventAdapter(slackSigningSecret, {
    includeBody : true
});
const slackInteraction = createMessageAdapter(slackSigningSecret);
const web = new WebClient(slackAccessToken);

const express_app = express();

//Attaching adapter
express_app.use('/slack/events', slackEvents.expressMiddleware());
express_app.use('/slack/actions', slackInteraction.expressMiddleware());
                 
//slashcommand Handler
express_app.post('/slack/commands', bodyParser.urlencoded({extended: false}), slackSlashController);


slackEvents.on('error', (error) => {
    console.log(error.name);
});

slackEvents.on('message',(message, body) => {
    if(body.event.hasOwnProperty('client_msg_id')){
        console.log("message => ", message);
        console.log("body => ", body);
        (async () => {
            console.log("inside async function");
            const res =await web.chat.postMessage({
                channel: message.channel,
                text : `message wapas aagya`
            });
            console.log(res);
        })();
    }
});

//Slack Interactive message handlers
slackInteraction.action('game', async (message, respond)=> {
    console.log('message',message.original_message);
    const reply = message.original_message;
    delete reply.attachments[0].actions[0];
    await console.log(reply);
    return reply;
})


slackInteraction.action('sendFriendRequest U01AJCWA5HT', (message, response) => {
    console.log('payload',message);
    const reply = message.original_message;
    delete reply.attachments[0].actions[0];
    console.log(reply);
    return reply;
});


const server = createServer(express_app);
server.listen(3000, () => {
    console.log("Connected to port 3000");
})