const { App } = require('@slack/bolt');
require('dotenv').config();


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
    console.log("Bot Active");
})();