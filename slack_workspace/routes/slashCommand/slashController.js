const create_heading = require('../../src/create_heading');
const create_user_object = require('../../src/users_src/create_user_object');
const dbmodule = require('../../../database_workspace/userService');


module.exports = async (req, res, next) => {
    if(req.body.command === '/search-user'){
        let query = req.body.text;
        console.log("body",req.body);
        let search_response = await dbmodule.searchUserWithName(req.body.user_id, query);
        let heading = `Search results for ${query} from <@${req.body.user}>`;
        console.log("search_user");
        let message = {
            "text": heading,
            "response_type" : 'in_channel', 
            "attachments" : []
        };
        console.log(search_response)
        let user;
        for(user of search_response){
            console.log("user", user)
            if(user.user_id != req.body.user_id){ 
                message.attachments.push(...create_user_object(user));
            }
        }
        console.log(message);
        res.send(message);
    }
    else if(req.body.commad === '/list-friends'){
        let search_response = await dbmodule.getMyFriends(req.body.user_id);
        let heading = `Search results for ${search_response} from <@${req.body.user}>`;

        let message = {
            "blocks" : []
        };

        message.blocks.push(...create_heading(heading));
        let user;
        for(user of search_response){
            message.blocks.push(...create_user_object);
        }
        res.send(message);
    }

}