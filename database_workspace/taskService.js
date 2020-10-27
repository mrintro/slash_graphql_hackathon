const task_queries = require("./taskDAO")

const AddTask = async function(title , description , deadline , user_id){
    return await task_queries.addTask(title , description , deadline , user_id);
}

const GetMyTasks = async function(user_id){
    return await task_queries.getMyTasks(user_id)
}

const GetMyActiveTasks = async function(user_id){
    return await task_queries.getMyActiveTasks(user_id);
}

const GetMyClosedTasks = async function(user_id){
    return await task_queries.getMyClosedTasks(user_id);
}

const GetFriendsActiveTasks = async function(user_id){
return await task_queries.getFriendsActiveTasks(user_id);
}

const GetTasksUsingUserId = async function(user_id){
    return await task_queries.getTasksUsingUserId(user_id);
}

const RemoveTask = async function(task_id){
    return await task_queries.removeTask(task_id);
}

const UpdateTask = async function(task_id , title , description , deadline){
    return await task_queries.updateTask(task_id , title , description , deadline);
}

const UpdateTaskStatus = async function(task_id , task_status){
    return await task_queries.UpdateTaskStatus(task_id , task_status);
}

const ViewTaskStatusUsingTaskId = async function(task_id){
    return await task_queries.viewTaskStatusUsingTaskId(task_id);
}

const AssignTask = async function(task_id , alloted_user_id){
    return await task_queries.assignTask(task_id , alloted_user_id);
}

const ViewAssignedTasks = async function(){
    // return await task_queries.viewAssignedTasks()
}

const VolunteerTask = async function(task_id , user_id){
    return await task_queries.volunteerTask(task_id , user_id);
}

const BackoutFromTask = async function(){
    return await task_queries.backoutFromTask(task_id , user_id);
}

const ViewVolunteeredTasks = async function(user_id){
    return await task_queries.viewVolunteeredTasks(user_id);
}

module.exports = {
    "addTask" : AddTask,
    "getMyTasks" : GetMyTasks,
    "getMyActiveTasks" : GetMyActiveTasks,
    "getMyClosedTasks" : GetMyClosedTasks,
    "getFriendsActiveTasks" : GetFriendsActiveTasks,
    "getTasksUsingUserId" : GetTasksUsingUserId,
    "removeTask" : RemoveTask,
    "assignTask" : AssignTask,
    "viewTaskStatusUsingTaskId" : ViewTaskStatusUsingTaskId,
    "viewVolunteeredTasks" : ViewVolunteeredTasks,
    "backoutFromTask" :  BackoutFromTask,
    "volunteerTask" :  VolunteerTask,
    "updateTask" :  UpdateTask,
    "viewAssignedTasks" : ViewAssignedTasks
};