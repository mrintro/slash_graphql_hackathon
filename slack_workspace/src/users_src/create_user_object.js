module.exports = function (details){
    return [{
            "type" : "section",
            "fields" : [
                {
                    "type": "mrkdwn",
                    "text": `*${details['Name']}*\n${details['username']}`
                }
            ]
        },
        {
            "type" : "actions",
            "elements" : [
                {
                    "type" : "button",
                    "text" : {
                        "type" : "plain_text",
                        "emoji": true,
                        "text" : "Send Friend Request"
                    },
                    "style" : "primary",
                    "value" : "click_me"
                },
                {
                    "type" : "button",
                    "text" : {
                        "type" : "plain_text",
                        "emoji": true,
                        "text" : "Block"
                    },
                    "style" : "primary",
                    "value" : "click_me"
                }
            ]
        },
        {
            "type" : "divider"
        }
    
    ]
}