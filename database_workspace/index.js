const fetch = require('node-fetch');


function fetchGraphQL(operationsDoc, operationName, variables) {
    return fetch(
        "http://localhost:8080/graphql",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName
        })
        }
    ).then((result) => result.json());
}

function executeQueryOrMutation(operationsDoc , operationName){
    function fetchMyQuery() {
        return fetchGraphQL(
            operationsDoc,
            operationName,
            {}
        );
        }
    
        fetchMyQuery()
        .then(({ data, errors }) => {
            if (errors) {
            console.error(errors);
            }
            console.log(data);
            // console.log(data["queryUser"]);
        })
        .catch((error) => {
            console.error(error);
        });
}

/* ADD A USER */
const addUser = function AddUser(id , username , name , email , profile_picture){
    const operationsDoc = `
    mutation AddUser {
        addUser(input: [
            {
                user_id: "` + id + `",
                username:"` + username + `", 
                name: "` + name + `" ,
                email: "` + email + `" ,
                profile_picture: "` + profile_picture + `"
            }]) {
        user {
            username
            name
            friends {
                username
                name
            }
        }
        }
    }
    `;
    console.log(operationsDoc);
    executeQueryOrMutation(operationsDoc , "AddUser");
}

/* GET ALL USERS(ONLY FOR ADMINS) */
function GetUsers(){
    const operationsDoc = `
    query GetAllUsers {
      queryUser(order: {asc: username}) {
        username
        name
        email
        profile_picture
        friends {
          username
          name
          profile_picture
        }
        best_friends{
            username
            name
            profile_picture
        }
      }
    }
  `;
  executeQueryOrMutation(operationsDoc , "GetAllUsers");
  
}

/* GET USER WITH USER_ID FOR EXACT DETAILS */
function GetUserWithUserId(user_id){
    const operationsDoc = `query GetUserWithUserId{
        getUser(user_id: "` + user_id + `"){
          user_id
          username
          name
          profile_picture
        }
      }
    `;
    executeQueryOrMutation(operationsDoc , "GetUserWithUserId");
}

/* GET A USER WITH USERNAME */
function GetUserWithUsername(username){
    const operationsDoc = `
    query GetUserWithUsername {
        queryUser(filter: {username: {eq: "` + username + `"}}) {
          name
          username
          email
          profile_picture
        }
      }
    `;
    executeQueryOrMutation(operationsDoc , "GetUserWithUsername");
    
}

/* GET ALL USERS WITH NAME */
const searchUserWithName = function GetUsersWithName(name){
    const operationsDoc = `
    query GetUsersWithName {
        queryUser(filter: {name: {anyofterms: "` + name +`"}}) {
        name
        username
        email
        profile_picture
        }
    }
    `;

    executeQueryOrMutation(operationsDoc , "GetUsersWithName");

}

/* VIEW MY FRIENDS */
function GetMyFriends(user_id){
    const operationsDoc = `
    query GetMyFriends {
        getUser(user_id: "` + user_id + `") {
           friends{
             user_id
             username
           }
         }
       }
  `;
  
  executeQueryOrMutation(operationsDoc , "GetMyFriends");
}

/* VIEW MY BEST FRIENDS */
function GetMyBestFriends(user_id){
    const operationsDoc = `
    query GetMyBestFriends {
        getUser(user_id: "` + user_id + `") {
           best_friends{
             user_id
             username
           }
         }
       }
  `;
  
  executeQueryOrMutation(operationsDoc , "GetMyBestFriends");
}

/* VIEW MY RECEIVED REQUESTS */
function GetMyReceivedRequests(user_id){
    const operationsDoc = `
    query GetMyReceivedRequests {
        getUser(user_id: "` + user_id + `") {
            received_requests{
             user_id
             username
           }
         }
       }
  `;
  
  executeQueryOrMutation(operationsDoc , "GetMyReceivedRequests");
}

/* VIEW MY SENT REQUESTS */
function GetMySentRequests(user_id){
    const operationsDoc = `
    query GetMySentRequests {
        getUser(user_id: "` + user_id + `") {
           sent_requests{
             user_id
             username
           }
         }
       }
  `;
  
  executeQueryOrMutation(operationsDoc , "GetMySentRequests");
}

/* SEND FRIEND REQUEST */
function SendFriendRequest(my_user_id , friend_user_id){
    const operationsDoc = `mutation SendFriendRequest{
        updateUser(input: {
          filter: {
            user_id: {
              eq: "` + my_user_id + `"
            }
          }
          set: {
            sent_requests: [
              {
                user_id: "` + friend_user_id + `"
              }
            ]
          }
        }){
          user{
            user_id
            username
            name
            sent_requests{
              user_id
              username
              name
            }
          }
        }
      }
    `;
    executeQueryOrMutation(operationsDoc , "SendFriendRequest");
}

/* SEND BEST FRIEND REQUEST */
function SendBestFriendRequest(my_user_id , friend_user_id){
    const operationsDoc = `mutation SendBestFriendRequest{
        updateUser(input: {
          filter: {
            user_id: {
              eq: "` + my_user_id + `"
            }
          }
          set: {
            sent_best_friend_requests: [
              {
                user_id: "` + friend_user_id + `"
              }
            ]
          }
        }){
          user{
            user_id
            username
            name
            sent_requests{
              user_id
              username
              name
            }
          }
        }
      }
    `;
    executeQueryOrMutation(operationsDoc , "SendBestFriendRequest");
}

function AcceptFriendRequest(my_user_id , friend_user_id){
    const operationsDoc = `mutation AcceptFriendRequest {
        updateUser(input: 
          {
            filter: 
            {
              user_id: 
              {
                eq: "` + my_user_id + `"
              }
            }, 
            set:{
              friends: [{
                user_id: "` + friend_user_id + `"
              }]
            },
            remove:{
              received_requests: [
                {
                    user_id: "` + friend_user_id + `"
                }
              ]
            }
          }){
            user {
            username
            name
            friends {
                username
                name
            }
            received_requests{
              username
              name
            }
         }
        }
      }
    `;
    executeQueryOrMutation(operationsDoc , "AcceptFriendRequest");
}

function declineFriendRequest(my_user_id , friend_user_id){
    const operationsDoc = `mutation declineFriendRequest {
        updateUser(input: 
          {
            filter: 
            {
              user_id: 
              {
                eq: "` + my_user_id + `"
              }
            }, 
            remove:{
              received_requests: [
                {
                    user_id: "` + friend_user_id + `"
                }
              ]
            }
          }){
            user {
            username
            name
            friends {
                username
                name
            }
            received_requests{
              username
              name
            }
         }
        }
      }
    `;
    executeQueryOrMutation(operationsDoc , "declineFriendRequest");
}

function AcceptBestFriendRequest(my_user_id , friend_user_id){
    const operationsDoc = `mutation AcceptBestFriendRequest {
        updateUser(input: 
          {
            filter: 
            {
              user_id: 
              {
                eq: "` + my_user_id + `"
              }
            }, 
            set:{
              best_friends: [{
                user_id: "` + friend_user_id + `"
              }]
            },
            remove:{
              received_best_friend_requests: [
                {
                    user_id: "` + friend_user_id + `"
                }
              ],
              friends: [
                {
                  user_id: "` + friend_user_id + `"
                }
              ]
            }
          }){
            user {
            username
            name
            friends {
                username
                name
            }
            received_requests{
              username
              name
            }
         }
        }
      }
    `;
    executeQueryOrMutation(operationsDoc , "AcceptBestFriendRequest");
}

function declineBestFriendRequest(my_user_id , friend_user_id){
    const operationsDoc = `mutation declineBestFriendRequest {
        updateUser(input: 
          {
            filter: 
            {
              user_id: 
              {
                eq: "` + my_user_id + `"
              }
            }, 
            remove:{
              received_best_friend_requests: [
                {
                    user_id: "` + friend_user_id + `"
                }
              ]
            }
          }){
            user {
            username
            name
            friends {
                username
                name
            }
            received_requests{
              username
              name
            }
         }
        }
      }
    `;
    executeQueryOrMutation(operationsDoc , "declineBestFriendRequest");
}

function RemoveFriend(my_user_id , friend_user_id){
    const operationsDoc = `mutation RemoveFriend {
        updateUser(input: 
          {
            filter: 
            {
              user_id: 
              {
                eq: "` + my_user_id + `"
              }
            }, 
            remove:{
              friends: [
                {
                    user_id: "` + friend_user_id + `"
                }
              ]
            }
          }){
            user {
            username
            name
            friends {
                username
                name
            }
            received_requests{
              username
              name
            }
         }
        }
      }
    `;
    executeQueryOrMutation(operationsDoc , "RemoveFriend");
}

function RemoveBestFriend(my_user_id , friend_user_id){
    const operationsDoc = `mutation RemoveBestFriend {
        updateUser(input: 
          {
            filter: 
            {
              user_id: 
              {
                eq: "` + my_user_id + `"
              }
            }, 
            remove:{
              best_friends: [
                {
                    user_id: "` + friend_user_id + `"
                }
              ]
            }
          }){
            user {
            username
            name
            friends {
                username
                name
            }
            received_requests{
              username
              name
            }
         }
        }
      }
    `;
    executeQueryOrMutation(operationsDoc , "RemoveBestFriend");
}

// AddUser("003" , "ria0412" , "Ria Jain" , "ria0412@gmail.com" , "pic_ria");
// GetUsers();
// GetUserWithUsername("shashank2409");
// GetUsersWithName("shashank");
// GetUsersWithName("Gupta");
// AddFriend("b" , "h");
// AddBestFriend("a" , "c");
// SendBestFriendRequest("002" , "003");
// AcceptBestFriendRequest("001" , "003");
// SendFriendRequest("002" , "003");
// AcceptBestFriendRequest("003" , "002");
// declineFriendRequest("003" , "002");
// SendFriendRequest("001" , "002");
// AcceptFriendRequest("002" , "001");
// RemoveFriend("001" , "002");
// RemoveBestFriend("003" , "002");

module.exports = {
  "addUser" : addUser,
  "searchUserWithName" : this.searchUserWithName
}