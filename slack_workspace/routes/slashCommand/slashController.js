const create_heading = require('../../src/create_heading');
const create_user_object = require('../../src/users_src/create_user_object');
const dbmodule = require('../../../database_workspace/userService');


module.exports = async (req, res, next)=>{
    if(req.body.command === '/search-user'){
        let query = req.body.text;


        const reply = {
            "text": "Search results for Shashank",
            "response_type" : 'in_channel', 
            "attachments": [
                {
                    "text": "shashank2409 (Shashank Gupta)",
                    "thumb_url" : "https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_200x200.jpg",
                    "fallback": "You are unable to choose a game",
                    "callback_id": "game",
                    "color": "#000000",
                    "actions": [
                        {
                            "name": "game",
                            "text": "Accept Friend Request",
                            "type": "button",
                            "value": "chess"
                        },
                        {
                            "name": "game",
                            "text": "Decline Friend Request",
                            "type": "button",
                            "value": "maze"
                        }
                    ]
                },
                {
                    "text": "shashank1001 (Shashank Arora)",
                    "thumb_url" : "https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_200x200.jpg",
                    "fallback": "You are unable to choose a game",
                    "callback_id": "game",
                    "color": "#11111",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "acf",
                            "text": "Accept Friend Request",
                            "type": "button",
                            "value": "kar denge",
                            "style": "primary"
                        },
                        {
                            "name": "df",
                            "text": "Decline Friend Request",
                            "type": "button",
                            "value": "nahi karege",
                            "style": "danger"
                        }
                    ]
                }
            ]
        }

        

        // let search_response = await dbmodule.getUsers(req.body.user_id);
        // let heading = `Search results for ${query} from <@${req.body.user}>`;

        // let message = {
        //     "blocks" : []
        // };
        // message.blocks.push(...create_heading(heading));
        // let user;
        // console.log(user);
        // for(user of search_response){
        //     if(user.user_id != req.body.user_id){ 
        //         message.blocks.push(...create_user_object(user));
        //     }
        // }
        // console.log(message.blocks);
        res.send(reply);
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