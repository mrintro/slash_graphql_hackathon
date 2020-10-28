const dbmodule = require("../../../database_workspace/index");

module.exports = {
        "actionresolve" : async (req, res, next) => {
        let actionJSONPayload = JSON.parse(req.body.payload);
        console.log("action received", actionJSONPayload)
        console.log(actionJSONPayload.actions[0].text)
        if(actionJSONPayload.actions[0].value.split(" ")[0] == "sendFriendRequest"){
            id = actionJSONPayload.actions[0].value.split(" ")[1];
            console.log("sending Request to ", id);
            await res.send("Sending Friend Request");
            console.log("response sent")
        }
    }
}