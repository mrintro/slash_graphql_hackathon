'use strict';

const { App, ContextMissingPropertyError } = require('@slack/bolt');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const databasemodule = require('../database_workspace/index')
const actions = require("./routes/actionRoute/actionroute")
const { createMessageAdapter } = require('@slack/interactive-messages');
require('dotenv').config();
const slackInteractions = createMessageAdapter(process.env.SIGNING_SECRET);

const express = require('express');

const express_app = express();

express_app.use('/slack/actions', slackInteractions.expressMiddleware());

express_app.post('/slack/actions', bodyParser.urlencoded({extended:false}), slackSlashCommand)

function doWork(){
  return new Promise((resolve) => setTimeout(() => resolve(1), 2));
}


function slackSlashCommand(req, res, next) {
  if (req.body.command === '/') {
    const type = req.body.text.split(' ')[0];
    res.send("message");
  } else {
    next();
  }
}






/*

slackInteractions.action({ type: 'button' }, (payload, respond) => {
    // Logs the contents of the action to the console
    console.log('payload', payload);
  
    doWork()
      .then(() => {
          console.log("responding to button")
        respond({ text: 'Processing complete.', replace_original: true });
      })
      .catch((error) => {
          console.log("there is an error");
        respond({ text: 'Sorry, there\'s been an error. Try again later.',  replace_original: true });
      });
  
    // Return a replacement message
      console.log("patani kaha");
    return { text: 'Processing...' };
  });

*/



express_app.use("/users",users);

express_app.use("/actions",actions)


express_app.post('/test', (req,res) => {
    res.send(req.body.text +' Ganda hai');
});

express_app.listen(5000, () => {
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

app.event('team_join', ({event,say}) => {
    console.log(event.user);
});




let usersStore = {};
async function fetchUsers() {
  try {
        const result = await app.client.users.list({
        token: process.env.SLACK_APP_TOKEN_ID
    });

    saveUsers(result.members);
  }
  catch (error) {
    console.error(error);
  }
}
function saveUsers(usersArray) {
    let userId = '';
    usersArray.forEach(function(user){
        if(user.is_bot==false){
            databasemodule.addUser(user.id, user.name, user.real_name, user.profile.email, user.profile.image_72)
            console.log("adding user "+user.name);
        }
        userId = user["id"];
        usersStore[userId] = user;
        console.log(user.profile.email);
    });
    console.log(databasemodule.getUsers())
}

fetchUsers();


(async () =>{
    await app.start(3000);
    console.log("Bot Active at 3000");
})();




//slack integration ahead
/*



slackInteractions.action({ type: 'static_select' }, (payload, respond) => {
    // Logs the contents of the action to the console
    console.log('payload', payload);
  
    // Send an additional message to the whole channel
    doWork()
      .then(() => {
        respond({ text: 'Thanks for your submission.' });
      })
      .catch((error) => {
        respond({ text: 'Sorry, there\'s been an error. Try again later.' });
      });
  
    // If you'd like to replace the original message, use `chat.update`.
    // Not returning any value.
  });
  
  // Example of handling all message actions
  slackInteractions.action({ type: 'message_action' }, (payload, respond) => {
    // Logs the contents of the action to the console
    console.log('payload', payload);
  
    // Send an additional message only to the user who made interacted, as an ephemeral message
    doWork()
      .then(() => {
        respond({ text: 'Thanks for your submission.', response_type: 'ephemeral' });
      })
      .catch((error) => {
        respond({ text: 'Sorry, there\'s been an error. Try again later.', response_type: 'ephemeral' });
      });
  
    // If you'd like to replace the original message, use `chat.update`.
    // Not returning any value.
  });
  
  // Example of handling all dialog submissions
  slackInteractions.action({ type: 'dialog_submission' }, (payload, respond) => {
    // Validate the submission (errors is of the shape in https://api.slack.com/dialogs#input_validation)
    const errors = validate(payload.submission);
  
    // Only return a value if there were errors
    if (errors) {
      return errors;
    }
  
    // Send an additional message only to the use who made the submission, as an ephemeral message
    doWork()
      .then(() => {
        respond({ text: 'Thanks for your submission.', response_type: 'ephemeral' });
      })
      .catch((error) => {
        respond({ text: 'Sorry, there\'s been an error. Try again later.', response_type: 'ephemeral' });
      });
  });
  
  // Example of handling attachment actions. This is for button click, but menu selection would use `type: 'select'`.
  slackInteractions.action({ type: 'button' }, (payload, respond) => {
    // Logs the contents of the action to the console
    console.log('payload', payload);
  
    doWork()
      .then(() => {
        respond({ text: 'Processing complete.', replace_original: true });
      })
      .catch((error) => {
        respond({ text: 'Sorry, there\'s been an error. Try again later.',  replace_original: true });
      });
  
    // Return a replacement message
    return { text: 'Processing...' };
  });



(async ()=> {
    await slackInteractions.start(4000);
    console.log("listening on port 4000");
});
*/