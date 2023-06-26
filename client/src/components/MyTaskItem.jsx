import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { Context } from "..";
import MyModal from "./UI/modal/MyModal";
import TaskForm from "./taskForm/TaskForm";
import { fetchTasksByResponsible, patchTaskStatus } from "../http/taskApi";

const MyTaskItem = observer(({ header, description, dateEnd, status, priority, responsible, id }) => {

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

    const updateTaskStatus = async ({ status }) => {
        await patchTaskStatus(status, id);
        await fetchTasksByResponsible(user.getUser.login)
            .then(data => {
                task.setMyTasks(data)
                task.setFilterMyTasks(data)
            })

        setModal(false)
    }

    return (
        <div className="myTasks" >
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
                    <button onClick={() => setModal(true)}>Редактировать</button>
                </div>
            </div>
            <MyModal
                visible={modal}
                setVisible={setModal}>
                <TaskForm
                    update={updateTaskStatus}
                    id={id}
                    disabled
                />
            </MyModal>
        </div>
    );
})

export default MyTaskItem;