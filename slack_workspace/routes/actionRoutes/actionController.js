const buttonBuilder = require('../../src/buttonBuilder');
const dbUserModules = require('../../../database_workspace/userService');


module.exports = async (req_body) => {
    console.log("req body", req_body);
    console.log("message", req_body.original_message);

    let valueOfAction = req_body.actions[0].value;
    let userID1 = req_body.user.id;
    let userID2 = valueOfAction.split(" ")[1];
    const attachmentID = req_body.attachment_id;
    let reply = req_body.original_message;
    console.log("reply")

    if(valueOfAction.split(" ")[0] === "sendFriendRequest"){
        let actionNew = await dbUserModules.sendFriendRequest(userID1, userID2);
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