import { action, computed, makeObservable, observable } from "mobx";

class TaskStore {
    constructor() {
        this.myTasks = [];
        this.tasksSubordinates = [];
        this.filterTasksSubordinates = [];
        this.filterMyTasks = [];
        makeObservable(this, {
            filterMyTasks: observable,
            tasksSubordinates: observable,
            myTasks: observable,
            filterTasksSubordinates: observable,
            setFilterMyTasks: action.bound,
            setMyTasks: action.bound,
            setTasksSubordinates: action.bound,
            setFilterTasksSubordinates: action.bound,
            getFilterTasksSubordinates: computed,
            getMyTasks: computed,
            getTasksSubordinates: computed,
            getFilterMyTasks: computed,
        })
    }
    setFilterMyTasks(array) {
        this.filterMyTasks = array;
    }
    setMyTasks(array) {
        return this.myTasks = array;
    }
    setTasksSubordinates(array) {
        return this.tasksSubordinates = array;
    }
    setFilterTasksSubordinates(array) {
        return this.filterTasksSubordinates = array;
    }

    get getFilterTasksSubordinates() {
        return this.filterTasksSubordinates;
    }

    get getMyTasks() {
        return this.myTasks;
    }
    get getTasksSubordinates() {
        return this.tasksSubordinates;
    }

    get getFilterMyTasks() {
        return this.filterMyTasks;
    }
}

export default TaskStore;