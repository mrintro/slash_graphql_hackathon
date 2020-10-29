module.exports = function (details){
    let buttons = details.buttons;
    let button, obj=[] , count = 0;
    for(button of buttons){
        var color;
        if(button.action == "acceptFriendRequest" || button.action == "acceptBestFriendRequest"){
            color = "primary";
        }
        else if(button.action == "cancelFriendRequest" || button.action == "sendFriendRequest"){
            color = "default";
        }
        else{
            color = "danger";
        }
        obj.push({
                "name": "accept_tos",
                "text": button.name,
                "type": "button",
                "value": button.action,
                "style": color
        })
    }
    
    return [{
        "text": "Search results for " + details.name,
        "attachments": [{
            "text": details.username + " (" + details.name + ")",
			"thumb_url" : details.profile_picture  ,
            "fallback": "Unable to search user",
            "callback_id": "user_found",
            "color": "#000000",
            "attachment_type": "default",
            "actions" : obj
        }
            
        ]
    }
    
    ]
}