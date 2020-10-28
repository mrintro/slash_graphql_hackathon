module.exports = function (details){
    let buttons = details.buttons;
    let button, obj=[];
    for(button of buttons){
        obj.push({
                "type" : "button",
                "text" : {
                    "type" : "plain_text",
                    "emoji": true,
                    "text" : button.name
                },
                "style" : "primary",
                "value" : button.action+" "+details.user_id
        })
    }
    
    return [{
            "type" : "section",
            "fields" : [
                {
                    "type": "mrkdwn",
                    "text": `*${details['username']}*\n${details['email']}`
                }
            ]
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