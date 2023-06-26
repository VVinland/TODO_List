import { authHost } from ".";

const createTaskBD = async (newTask) => {
    const { data } = await authHost.post('api/task/createTask', newTask)
    console.log(data);
    return data;
}

const fetchTasksById = async id => {
    const { data } = await authHost.post('api/task/fetchById', { id })
    return data
}

const fetchTasksByResponsible = async login => {
    try {
        const { data } = await authHost.post('api/task/fetchByResponsible', { login })
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

const deleteTask = async (id) => {
    const { data } = await authHost.delete('api/task/deleteTask', { data: { id } });
    return data;
}

const fullTaskUpdate = async (updateTask) => {
    const { data } = await authHost.put('api/task/updateTask', updateTask);
    console.log(data);
    return data
}

const patchTaskStatus = async (status, id) => {
    const { data } = await authHost.put('api/task/updateTaskStatus', { status, id });
    console.log(data);
    return data;
}

const getTaskById = async (id) => {
    const { data } = await authHost.post('api/task/getOneTask', { id });
    return data;
}

export {
    createTaskBD,
    fetchTasksById,
    fetchTasksByResponsible,
    deleteTask,
    fullTaskUpdate,
    getTaskById,
    patchTaskStatus
}