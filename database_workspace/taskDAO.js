const fetch = require('node-fetch');
const database_url = "http://localhost:8080/graphql";

async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(
      database_url,
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
    );
    return await result.json();
  }

  
  async function fetchGetAllUsers(operationsDoc , operationName) {
    return await fetchGraphQL(
      operationsDoc,
      operationName,
      {}
    );
  }
  
  async function executeQueryOrMutation(operationsDoc , operationName) {
    const { errors, data } = await fetchGetAllUsers(operationsDoc , operationName);
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
      return errors;
    }
    // console.log("executing");
    // console.log(data);
    return await data;
  }


/* ADD TASK */
const AddTask = async function (id , username , name , email , task){
    const operationsDoc = `
     mutation AddTask {
         addTask(input: [
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
     var data = await executeQueryOrMutation(operationsDoc , "AddUser");
     return data;
 }
