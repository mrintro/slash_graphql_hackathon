const database_queries = require ("./index.js");

const checkRelation = async function(relation , user_data , user2_id){
    // console.log(relation);
    // console.log(user_data["friends"]);
    for(var i = 0; i < user_data[relation].length; i++){
        if(user_data[relation][i]["user_id"] == user2_id){
            return 1;
        }
    }
    return 0;
}

const addRelationButtons = async function(all_users , user_data){
    var my_user_id =  user_data["user_id"];
    if(all_users.length == undefined){
        all_users = [all_users];
    }
    console.log(all_users);
    console.log(typeof(all_users));
    for(var i = 0; i < all_users.length; i++){
        friend_user_id = all_users[i]["user_id"] , friend_name = all_users[i]["name"];
        if(friend_user_id == my_user_id){
            continue;
        }
        var friend = await checkRelation("friends" , user_data , friend_user_id);
        var buttons = [];
        if(friend == 1){
            buttons = [{
                    "name" : "Remove " + friend_name + " from Friends",
                    "action" : "removeFriend"
                }
            ];
        }
        var best_friend = await checkRelation("best_friends" , user_data , friend_user_id);
        if(best_friend == 1){
            buttons = [{
                "name" : "Remove " + friend_name + " from Best Friends",
                "action" : "removeBestFriend"
            }];
        }
        var sent_friend_req = await checkRelation("sent_requests" , user_data , friend_user_id);
        if(sent_friend_req == 1){
            buttons = [{
                "name" : "Cancel Friend Request",
                "action" : "cancelFriendRequest"
            }];
        }
        var received_friend_req = await checkRelation("received_requests" , user_data , friend_user_id);
        if(received_friend_req == 1){
            buttons = [{
                "name" : "Accept Friend Request",
                "action" : "acceptFriendRequest"
            }, 
            {
                "name" : "Decline Friend Request",
                "action" : "declineFriendRequest"
            }];
        }
        var sent_bf_req = await checkRelation("sent_best_friend_requests" , user_data , friend_user_id);
        if(sent_bf_req == 1){
            buttons = [{
                "name" : "Cancel Best Friend Request",
                "action" : "cancelBestFriendRequest"
            }];
        }
        var rec_bf_req = await checkRelation("received_best_friend_requests" , user_data , friend_user_id);
        
        if(rec_bf_req == 1){
            
            buttons = [{
                "name" : "Accept Best Friend Request",
                "action" : "acceptBestFriendRequest"
            }, 
            {
                "name" : "Decline Best Friend Request",
                "action" : "declineBestFriendRequest"
            }];
        }
        console.log(buttons);
        if(buttons.length == 0){
            buttons = [
                {
                    "name" : "Send Friend Request",
                    "action" : "sendFriendRequest"
                }];
        }
        all_users[i]["buttons"] = buttons;
        console.log(all_users[i]);
    }
    return all_users;
}

/* ADD A USER */
const AddUser = async function (id , username , name , email , profile_picture){
    return database_queries.AddUser(id , username , name , email , profile_picture);
}
 
 /* GET ALL USERS(ONLY FOR ADMINS) */
const GetUsers = async function(my_user_id){
    var all_users = await database_queries.getUsers() , user_data = await database_queries.getUserWithUserId(my_user_id);
    console.log("data -> " , all_users , user_data);
    all_users = await all_users.queryUser;
    user_data = await user_data.getUser;
    // console.log(all_users);

    all_users = await addRelationButtons(all_users , user_data);

    return all_users;
}

/* GET USER WITH USER_ID FOR EXACT DETAILS */
const GetUserWithUserId = async function (my_user_id , user_id){

    var all_users = await database_queries.getUserWithUserId(user_id) , user_data = await database_queries.getUserWithUserId(my_user_id);
    console.log("data -> " , all_users , user_data);
    all_users = await all_users.getUser;
    user_data = await user_data.getUser;
    

    all_users = await addRelationButtons(all_users , user_data);
    console.log("Final data -> " , all_users);
    return all_users;
}

/* GET A USER WITH USERNAME */
const GetUserWithUsername = async function (my_user_id , username){
    var all_users = await database_queries.getUserWithUsername(username) , user_data = await database_queries.getUserWithUserId(my_user_id);
    console.log("data -> " , all_users , user_data);
    all_users = await all_users.queryUser;
    user_data = await user_data.getUser;
    console.log(all_users);

    all_users = await addRelationButtons(all_users , user_data);

    return all_users;
}

/* GET ALL USERS WITH NAME */
const SearchUserWithName = async function(my_user_id , name){
    var all_users = await database_queries.searchUserWithName(name) , user_data = await database_queries.getUserWithUserId(my_user_id);
    console.log("data -> " , all_users , user_data);
    all_users = await all_users.queryUser;
    user_data = await user_data.getUser;
    console.log(all_users);

    all_users = await addRelationButtons(all_users , user_data);
    return all_users;
}

/* VIEW MY FRIENDS */
const GetMyFriends = async function (user_id){
    return database_queries.GetMyFriends(user_id);
}

/* VIEW MY BEST FRIENDS */
const GetMyBestFriends = async function (user_id){
    return database_queries.GetMyBestFriends(user_id);
}

/* VIEW MY RECEIVED REQUESTS */
const GetMyReceivedRequests = async function (user_id){
    return database_queries.getMyReceivedRequests(user_id);
}

/* VIEW MY SENT REQUESTS */
const GetMySentRequests = async function (user_id){
    return database_queries.getMySentRequests(user_id);
}

/* SEND FRIEND REQUEST */
const SendFriendRequest = async function (my_user_id , friend_user_id){
    

}

/* SEND BEST FRIEND REQUEST */
const SendBestFriendRequest = async function (my_user_id , friend_user_id){
    
}

/* ACCEPT AN INCOMING FRIEND REQUEST */
const AcceptFriendRequest = async function (my_user_id , friend_user_id){
    database_queries.acceptFriendRequest(my_user_id , friend_user_id);
}

/* DECLINE AN INCOMING FRIEND REQUEST */
const DeclineFriendRequest = async function (my_user_id , friend_user_id){
    
}

/* ACCEPT AN INCOMING BEST FRIEND REQUEST */
const AcceptBestFriendRequest = async function (my_user_id , friend_user_id){
    database_queries.acceptBestFriendRequest(my_user_id , friend_user_id);
}

/* DECLINE AN INCOMING BEST FRIEND REQUEST */
const DeclineBestFriendRequest = async function (my_user_id , friend_user_id){
    
}

/* REMOVE A FRIEND FROM YOUR FRIEND LIST */
const RemoveFriend = async function (my_user_id , friend_user_id){
    
}

/* REMOVE A FRIEND FROM YOUR BEST FRIEND LIST */
const RemoveBestFriend = async function (my_user_id , friend_user_id){
    
}

module.exports = {
    "addUser" : AddUser,
    "getUsers" : GetUsers,
    "getUserWithUserId" : GetUserWithUserId,
    "getUserWithUsername" : GetUserWithUsername,
    "searchUserWithName" : SearchUserWithName,
    "getMyFriends" : GetMyFriends,
    "getMyBestFriends" : GetMyBestFriends,
    "getMyReceivedRequests" : GetMyReceivedRequests,
    "getMySentRequests" : GetMySentRequests,
    "sendFriendRequest" : SendFriendRequest,
    "sendBestFriendRequest" : SendBestFriendRequest,
    "acceptFriendRequest" : AcceptFriendRequest,
    "declineFriendRequest" : DeclineFriendRequest,
    "acceptBestFriendRequest" : AcceptBestFriendRequest,
    "declineBestFriendRequest" : DeclineBestFriendRequest,
    "removeFriend" : RemoveFriend,
    "removeBestFriend" :  RemoveBestFriend
}

// GetUsers("001");
// SearchUserWithName("003" , "Shashank");
// GetUserWithUserId("003" , "001");
// GetUserWithUsername("001" , "ria0412");
// AcceptBestFriendRequest("001" , "003");
// AcceptFriendRequest("002" , "001");