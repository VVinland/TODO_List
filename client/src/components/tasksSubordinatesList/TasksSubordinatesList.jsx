import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Context } from "../..";
import TaskSubordinatesItem from "../TaskSubordinatesItem";
import { deleteTask, fetchTasksById } from "../../http/taskApi";
import "./../../style/tasksList.css";


const TasksSubordinatesList = observer(() => {

    const { user, task } = useContext(Context);

    useEffect(() => {
        fetchTasksById(user.getUser.id)
            .then(data => {
                task.setTasksSubordinates(data);
                task.setFilterTasksSubordinates([]);
            })

    }, [user.getUser.id, user.getUser.login])

    const removeTask = async (id) => {
        try {
            await deleteTask(id);
            await fetchTasksById(user.getUser.id)
                .then(data => task.setTasksSubordinates(data))
        } catch (error) {
            console.log(error.message);
        }
    }

    return (

        <div className="tasksSubordinatesList">
            <h1>Задания моим подчинённым:</h1>
            {task.getTasksSubordinates.map(item => {
                return <TaskSubordinatesItem
                    key={item.id}
                    header={item.header}
                    description={item.description}
                    dateEnd={item.dateEnd}
                    status={item.status}
                    priority={item.priority}
                    responsible={item.responsible}
                    id={item.id}
                    remove={removeTask}
                />
            }
            )}
        </div>
    );
})

export default TasksSubordinatesList;