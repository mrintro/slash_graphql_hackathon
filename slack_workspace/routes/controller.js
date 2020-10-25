const create_user_object = require("../src/users_src/create_user_object");
const create_heading = require("../src/create_heading");


module.exports = {
    "usermethod" : async (req,res,next) =>{
        console.log(req.body);
        let search_name = req.body.text;
        let search_results = [{
            'username' : 'ani',
            'Name' : 'Aniket Panwar'
        },
        {
            'username' : 'shashank2408',
            'Name' : 'shashank Gupta'
        },
        {
            'username' : 'ria',
            'Name' : 'ria jain'
        }];
        let heading = `Search results for ${search_name} from <@${req.body.user_name}>`;
        let message = {
            "blocks": [
            ]
        };

        message["blocks"].push(...create_heading(heading));
        var user;
        for(user of search_results){
            message["blocks"].push(...create_user_object(user));
        }
        
        console.log(message);

        console.log(`Search results for ${search_name}`);
        res.send(message);
    }
}