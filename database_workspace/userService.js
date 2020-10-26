const database_queries = require ("./index.js");

/* ADD A USER */
const AddUser = async function (id , username , name , email , profile_picture){
    return database_queries.AddUser(id , username , name , email , profile_picture);
}
 
 /* GET ALL USERS(ONLY FOR ADMINS) */
const GetUsers = async function(){
    return database_queries.getUsers();
}

/* GET USER WITH USER_ID FOR EXACT DETAILS */
const GetUserWithUserId = async function (user_id){
    return database_queries.getUserWithUserId(user_id);
}

/* GET A USER WITH USERNAME */
const GetUserWithUsername = async function (username){
    return database_queries.GetUserWithUsername(username);
}

/* GET ALL USERS WITH NAME */
const SearchUserWithName = async function(name){
    const data = await database_queries.searchUserWithName(name);
    console.log("data-> ", data);
    return data;
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
    
}

/* DECLINE AN INCOMING FRIEND REQUEST */
const DeclineFriendRequest = async function (my_user_id , friend_user_id){
    
}

/* ACCEPT AN INCOMING BEST FRIEND REQUEST */
const AcceptBestFriendRequest = async function (my_user_id , friend_user_id){
    
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
    "GetUserWithUsername" : GetUserWithUsername,
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