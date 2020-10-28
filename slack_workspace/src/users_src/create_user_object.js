module.exports = function (details){
    let buttons = details.buttons;
    let button, obj=[];
    for(button of buttons){
        var color;
        if(button.action == "acceptFriendRequest" || button.action == "acceptBestFriendRequest" || button.action == "sendFriendRequest" || button.action == "sendBestFriendRequest"){
            color = "primary";
        }
        else{
            color = "danger";
        }
        obj.push({
                "type" : "button",
                "text" : {
                    "type" : "plain_text",
                    "emoji": true,
                    "text" : button.name
                },
                "style" : color,
                "value" : button.action+" "+details.user_id
        })
    }
    
    return [{
            "type" : "section",
            "text" : 
                {
                    "type": "mrkdwn",
                    "text": `*${details['username']}* \n${details['name']}`
                },
                "accessory": {
                    "type": "image",
                    "image_url": details.profile_picture,
                    "alt_text": details.username
                }
            
        },
        {
            "type" : "actions",
            "elements" : obj
        },
        {
            "type" : "divider"
        }
    
    ]
}