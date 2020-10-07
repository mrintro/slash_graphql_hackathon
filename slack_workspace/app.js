const { App } = require('@slack/bolt');
require('dotenv').config();


const app = new App({
    token : process.env.SLACK_APP_TOKEN_ID,
    signingSecret : process.env.SIGNING_SECRET
});


const start_app = (async () =>{
    await app.start(process.env.PORT);
    console.log("Bot Active");
})();