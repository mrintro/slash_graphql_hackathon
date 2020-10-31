require('dotenv').config();

const buttonBuilder = require('../../src/buttonBuilder');
const dbUserModules = require('../../../database_workspace/userService');
const dbmodule = require('../../../database_workspace/userService');
const dbTaskModule = require('../../../database_workspace/taskService');
const volunteerList = require('../../src/users_src/create_volunteer_list');
const {WebClient} = require('@slack/web-api');

const web = new WebClient(process.env.SLACK_APP_TOKEN_ID);

module.exports = async (req_body) => {
    // console.log("req body", req_body);
    // console.log("message", req_body.original_message);

    let valueOfAction = req_body.actions[0].value;
    let userID1 = req_body.user.id;
    let userID2 = valueOfAction.split(" ")[1];
    const attachmentID = req_body.attachment_id;
    let reply = req_body.original_message;
    console.log(req_body);


    if(valueOfAction.split(" ")[0] === "viewVolunteers"){
        /**userID1 is Task ID and UserID2 is the posted_by_user_id */
        let actionNew = await dbTaskModule.viewVolunteers(userID2);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : [],
            "user_id" : userID2
        }
        let volunteers = actionNew.getTask.volunteered_by;
        if(volunteers.length === 0){
            return reply;
        }else{
            let payload = {
                "attachments" :[]
            }
            for(user of volunteers){
                payload.attachments.push(...volunteerList(user))
            }
            // let payload = volunteerList(volunteers);
            console.log(payload);
            return payload;
        }
        return reply;
    }

    if(valueOfAction.split(" ")[0] === "assignTask"){
        /**userID1 is Task ID and UserID2 is the posted_by_user_id */
        let actionNew = await dbTaskModule.assignTask(userID2, userID1);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : [{
                "name" : "This user has been alloted the task",
                "action" : "alloted"
            }],
            "user_id" : userID2
        }
        reply.attachments[attachmentID-1].actions = buttonBuilder(obj);
        console.log("reply2", reply.attachments);
        return reply;
    }

    if(valueOfAction.split(" ")[0] === "volunteerTask"){
        /**userID1 is Task ID and UserID2 is the posted_by_user_id */
        let actionNew = await dbTaskModule.volunteerTask(userID2, userID1);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : [{
                "name" : "Thanks for Volunteering",
                "action" : "nothing"
            }],
            "user_id" : userID2
        }
        reply.attachments[attachmentID-1].actions = buttonBuilder(obj);
        console.log("reply2", reply.attachments);
        return reply;
    }


    if(valueOfAction.split(" ")[0] === "sendFriendRequest"){
        let actionNew = await dbUserModules.sendFriendRequest(userID1, userID2);
        console.log("reply1", reply.attachments);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : actionNew,
            "user_id" : userID2
        }
        // (async () => {
        //     await web.chat.postMessage({
        //         channel: 
        //     })
        // })
        reply.attachments[attachmentID-1].actions = buttonBuilder(obj);
        console.log("reply2", reply.attachments);
        return reply;
    }

    if(valueOfAction.split(" ")[0] === "cancelFriendRequest"){
        let actionNew = await dbUserModules.cancelFriendRequest(userID1, userID2);
        console.log("reply1", reply.attachments);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : actionNew,
            "user_id" : userID2
        }
        reply.attachments[attachmentID-1].actions = buttonBuilder(obj);
        console.log("reply2", reply.attachments);
        return reply;
    }

    if(valueOfAction.split(" ")[0] === "acceptFriendRequest"){
        let actionNew = await dbUserModules.acceptFriendRequest(userID1, userID2);
        console.log("reply1", reply.attachments);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : actionNew,
            "user_id" : userID2
        }
        reply.attachments[attachmentID-1].actions = buttonBuilder(obj);
        console.log("reply2", reply.attachments);
        return reply;
    }

    if(valueOfAction.split(" ")[0] === "declineFriendRequest"){
        let actionNew = await dbUserModules.declineFriendRequest(userID1, userID2);
        console.log("reply1", reply.attachments);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : actionNew,
            "user_id" : userID2
        }
        reply.attachments[attachmentID-1].actions = buttonBuilder(obj);
        console.log("reply2", reply.attachments);
        return reply;
    }

    if(valueOfAction.split(" ")[0] === "removeFriend"){
        let actionNew = await dbUserModules.removeFriend(userID1, userID2);
        console.log("reply1", reply.attachments);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : actionNew,
            "user_id" : userID2
        }
        reply.attachments[attachmentID-1].actions = buttonBuilder(obj);
        console.log("reply2", reply.attachments);
        return reply;
    }

    if(valueOfAction.split(" ")[0] === "sendBestFriendRequest"){
        let actionNew = await dbUserModules.sendBestFriendRequest(userID1, userID2);
        console.log("reply1", reply.attachments);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : actionNew,
            "user_id" : userID2
        }
        reply.attachments[attachmentID-1].actions = buttonBuilder(obj);
        console.log("reply2", reply.attachments);
        return reply;
    }

    if(valueOfAction.split(" ")[0] === "acceptBestFriendRequest"){
        let actionNew = await dbUserModules.acceptBestFriendRequest(userID1, userID2);
        console.log("reply1", reply.attachments);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : actionNew,
            "user_id" : userID2
        }
        reply.attachments[attachmentID-1].actions = buttonBuilder(obj);
        console.log("reply2", reply.attachments);
        return reply;
    }

    if(valueOfAction.split(" ")[0] === "declineBestFriendRequest"){
        let actionNew = await dbUserModules.declineBestFriendRequest(userID1, userID2);
        console.log("reply1", reply.attachments);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : actionNew,
            "user_id" : userID2
        }
        reply.attachments[attachmentID-1].actions = buttonBuilder(obj);
        console.log("reply2", reply.attachments);
        return reply;
    }

    if(valueOfAction.split(" ")[0] === "removeBestFriend"){
        let actionNew = await dbUserModules.removeBestFriend(userID1, userID2);
        console.log("reply1", reply.attachments);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : actionNew,
            "user_id" : userID2
        }
        reply.attachments[attachmentID-1].actions = buttonBuilder(obj);
        console.log("reply2", reply.attachments);
        return reply;
    }

    if(valueOfAction.split(" ")[0] === "cancelBestFriendRequest"){
        let actionNew = await dbUserModules.cancelBestFriendRequest(userID1, userID2);
        console.log("reply1", reply.attachments);
        delete reply.attachments[attachmentID-1].actions;
        let obj = {
            "buttons" : actionNew,
            "user_id" : userID2
        }
        reply.attachments[attachmentID-1].actions = buttonBuilder(obj);
        console.log("reply2", reply.attachments);
        return reply;
    }
} 