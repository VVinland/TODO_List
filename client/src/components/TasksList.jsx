import MyTasksList from "./myTaskList/MyTasksList";
import TasksSubordinatesList from "./tasksSubordinatesList/TasksSubordinatesList";

const TasksList = () => {
    return (
        <div className="taskField">
            <MyTasksList />
            <TasksSubordinatesList />
        </div>
    );
}

export default TasksList;