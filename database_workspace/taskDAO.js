const fetch = require('node-fetch');
const { getUserWithUserId } = require('.');
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
const AddTask = async function (title , description , deadline , user_id){
    const operationsDoc = `
    mutation AddTask{
        addTask(input:[
          {
            title : "` + title + `",
            description : "` + description + `",
            deadline : "` + deadline + `",
            posted_by : {
                user_id: "` + user_id + `", 
            },
            status : uploaded
          }
        ]){
          task{
            task_id
            title
            description
            posted_by{
                  user_id
            }
          }
        }
      }
     `;
     console.log(operationsDoc);
     var data = await executeQueryOrMutation(operationsDoc , "AddTask");
     return data;
 }

/* GET MY TASKS */
const GetMyTasks = async function (user_id){
    const operationsDoc = `
    query GetMyTasks {
        getUser(user_id:"`+ user_id + `") {
            active_tasks{
              title
              description
              deadline
              volunteered_by{
                username
              }
            }
           closed_tasks{
            title
            description
            deadline
            alloted_to{
              username
            }
          }
        }
      }
     `;
     console.log(operationsDoc);
     var data = await executeQueryOrMutation(operationsDoc , "GetMyTasks");
     return data;
 }

 const GetMyActiveTasks = async function (user_id){
    const operationsDoc = `
    query GetMyActiveTasks {
        getUser(user_id:"`+ user_id + `") {
            active_tasks{
              title
              description
              deadline
              volunteered_by{
                username
              }
            }
        }
      }
     `;
     console.log(operationsDoc);
     var data = await executeQueryOrMutation(operationsDoc , "GetMyActiveTasks");
     return data;
 }

 const GetMyClosedTasks = async function (user_id){
    const operationsDoc = `
    query GetMyClosedTasks {
        getUser(user_id:"`+ user_id + `") {
            closed_tasks{
              title
              description
              deadline
              alloted_to{
                username
              }
            }
        }
      }
     `;
     console.log(operationsDoc);
     var data = await executeQueryOrMutation(operationsDoc , "GetMyClosedTasks");
     return data;
 }

 const GetFriendsActiveTasks = async function (user_id){
    const operationsDoc = `
    query GetFriendsActiveTasks {
        getUser(user_id:"`+ user_id + `") {
            friends{
                username
                active_tasks{
                  title
                  description
                  deadline
                }
            }
        }
      }
     `;
     console.log(operationsDoc);
     var data = await executeQueryOrMutation(operationsDoc , "GetFriendsActiveTasks");
     return data;
 }

 const GetTasksUsingUserId = async function (user_id){
    const operationsDoc = `
    query GetTasksUsingUserId {
        getUser(user_id:"`+ user_id + `") {
            active_tasks{
                title
                description
                deadline
            }
        }
      }
     `;
     console.log(operationsDoc);
     var data = await executeQueryOrMutation(operationsDoc , "GetTasksUsingUserId");
     return data;
 }

 const RemoveTask = async function (task_id){
    const operationsDoc = `
    mutation RemoveTask{
        deleteTask (filter: {
          task_id:[
            "` + task_id + `"
          ]
        }){
          msg
        }
      }
     `;
     console.log(operationsDoc);
     var data = await executeQueryOrMutation(operationsDoc , "RemoveTask");
     return data;
 }

GetMyTasks("002");