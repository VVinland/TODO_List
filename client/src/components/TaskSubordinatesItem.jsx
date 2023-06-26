import { observer } from "mobx-react";
import MyModal from "./UI/modal/MyModal";
import TaskForm from "./taskForm/TaskForm";
import { useCallback, useContext, useMemo, useState } from "react";
import { fetchTasksById, fullTaskUpdate } from "../http/taskApi";
import { Context } from "..";

const TaskSubordinatesItem = observer(({ header, description, dateEnd, status, priority, responsible, remove, id }) => {
    const [modal, setModal] = useState(false);
    const { user, task } = useContext(Context);
    const classes = ["task_container-content_entry"];

    if (status === "Выполнена") {
        classes.push("greenColor")
    } else if (status === "Выполняется") {
        classes.push("redColor")
    } else {
        classes.push("greyColor")
    }

    const updateTask = async (updatedTask) => {
        await fullTaskUpdate(updatedTask, id);
        await fetchTasksById(user.getUser.id)
            .then(data => {
                task.setTasksSubordinates(data)
                task.setFilterTasksSubordinates(data);
            })
        setModal(false)
    }

    return (
        <div className="tasksSubordinates" >
            <div className="tasks_contet" >
                <div className="task_container">
                    <div className="task_container-content">
                        <div className={classes.join(' ')}>
                            <label>Заголовок</label>
                            <span>{header}</span>
                        </div>
                        <div className="task_container-content_entry">
                            <label>Статус</label>
                            <span>{status}</span>
                        </div>
                        <div className="task_container-content_entry">
                            <label>Ответственный</label>
                            <span>{responsible}</span>
                        </div>
                        <div className="task_container-content_entry">
                            <label>Приоритет</label>
                            <span>{priority}</span>
                        </div>
                        <div className={classes.join(' ')}>
                            <label>Дата окончания задачи</label>
                            <span>{dateEnd}</span>
                        </div>
                    </div>
                    <div className="task-description">
                        <label>Описание</label>
                        <span>{description}</span>
                    </div>
                </div>

                <div className="tasks_button">
                    <button onClick={() => setModal(true)} >Редактировать</button>
                    <button onClick={() => remove(id)}>Удалить</button>
                </div>
            </div>
            <MyModal
                visible={modal}
                setVisible={setModal}>
                <TaskForm
                    update={updateTask}
                    id={id} />
            </MyModal>
        </div>
    );
})

export default TaskSubordinatesItem
