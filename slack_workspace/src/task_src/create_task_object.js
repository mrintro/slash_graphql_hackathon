module.exports = function (details){
    return [{
        "type": "section",
        "fields": [
            {
                "type": "mrkdwn",
                "text": `*Title:*\n${details['title']}`
            },
            {
                "type": "mrkdwn",
                "text": `*Posted By:*\n${details['name']}(${details['username']})`
            },
            {
                "type": "mrkdwn",
                "text": `*Deadline:*\n${details['deadline']}`
            }
        ]
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `*Description:*\n${details['description']}`
        }
    },
    {
        "type": "actions",
        "elements": [
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "emoji": true,
                    "text": "Volunteer for this task"
                },
                "style": "primary",
                "value": "click_me_123"
            }
        ]
    }
    
    ]
}

