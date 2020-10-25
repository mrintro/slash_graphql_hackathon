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
function AddUser(id , username , name , email , profile_picture){
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
    const operationDoc = `query GetUserWithUserId{
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
function GetUsersWithName(name){
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

/* SEND FRIEND REQUEST */
function SendFriendRequest(my_user_id , friend_user_id){
    const operationDoc = `mutation SendFriendRequest{
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

function AcceptRequest(user_id){
    
}

/* ADD FRIEND */
function AddFriend(username , friendUsername){
    const operationsDoc = `
        mutation AddFriend {
        updateUser(input: {filter: {username: {eq: "` + username + `"}}, set: {friends: [{username: "` + friendUsername + `"}]}}) {
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
    executeQueryOrMutation(operationsDoc , "GetMyFriends");
}

/* ADD BEST FRIEND BUT DELETE THE PERSON FROM FRIENDS LIST */
function AddBestFriend(username , friendUsername){
    const operationsDoc = `
        mutation AddBestFriend {
            updateUser(input: 
            {filter: {username: {eq: "`+ username + `"}}, 
                remove: {friends: [{username: "` + friendUsername + `"}]}, 
                set: {best_friends: [{username: "` + friendUsername + `"}]}
            }){
            user{
            username
            name
            friends{
                username
                name
            }
            best_friends{
                username
                name
            }
            }
        }
    }
    `;

}


AddUser("003" , "ria0412" , "Ria Jain" , "ria0412@gmail.com" , "pic_ria");
// GetUsers();
// GetUserWithUsername("shashank2409");
// GetUsersWithName("shashank");
// GetUsersWithName("Gupta");
// AddFriend("b" , "h");
// AddBestFriend("a" , "c");