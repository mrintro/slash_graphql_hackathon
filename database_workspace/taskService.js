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

const UpdateTask = async function(){

}

const UpdateTaskStatus = async function(){

}

const ViewTaskStatusUsingTaskId = async function(){

}

const AssignTask = async function(){

}

const ViewAssignedTasks = async function(){

}

const VolunteerTask = async function(){

}

const BackoutFromTask = async function(){

}

const ViewVolunteeredTasks = async function(user_id){
    
}