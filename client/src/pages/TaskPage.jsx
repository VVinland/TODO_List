import { useContext, useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import "./../style/taskPage.css";
import { observer } from "mobx-react";
import TaskForm from "../components/taskForm/TaskForm";
import TaskFilter from "../components/taskFilter/TaskFilter";
import { Context } from "..";
import { createTaskBD, fetchTasksById } from "../http/taskApi";
import TasksList from "../components/TasksList";


const TaskPage = observer(() => {
    const [modal, setModal] = useState(false);
    const { task, user } = useContext(Context);

    const createTask = async (newTask) => {
        try {
            if (newTask.description.length > 255) {
                alert("В поле описание помещается максимум 255 символов");
                return;
            }
            await createTaskBD(newTask)
                .then(data => {
                    if (data.message) {
                        alert("Введите пожалуйста данные");
                        return;
                    }
                    fetchTasksById(user.getUser.id)
                        .then(data => {
                            task.setTasksSubordinates(data);
                            task.setFilterTasksSubordinates(data);
                        })
                    setModal(false)
                })
                .catch(error => alert(error))
            console.log('createTask');
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="taskPage">

            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <TaskForm create={createTask} />
            </MyModal>
            <MyButton onClick={() => setModal(true)}>Новая задача</MyButton>

            <div className="wrapperTask">
                <TaskFilter myTaskClasses="myTaskFilter" />
                <TasksList />
                <TaskFilter subordinatesTaskClasses="subordinatesTaskFilter" />
            </div>

        </div>
    );
})

export default TaskPage;