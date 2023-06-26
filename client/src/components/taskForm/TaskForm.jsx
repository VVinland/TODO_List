import { useContext, useEffect, useState } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import MySelect from "../UI/mySelect/MySelect";
import { observer } from "mobx-react";
import { Context } from "../..";
import { fetchSubordinatesBySupervisor } from "../../http/userApi";
import { getTaskById } from "../../http/taskApi";
import './taskForm.css';

const TaskForm = observer(({ create, update, id, ...props }) => {
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const { user } = useContext(Context);
    const [responsible, setResponsible] = useState(user.getSubordinates[0]);
    const [newTask, setNewTask] = useState({
        header: "",
        description: "",
        dateEnd: "",
        priority: "",
        status: "",
        creator: user.getUser.login,
        responsible: user.getSubordinates[0],
        userId: user.getUser.id
    })

    useEffect(() => {
        fetchSubordinatesBySupervisor()
            .then(data => user.setSubordinates(data))
    }, [user.getUser.id])

    const addTask = async (event) => {
        event.preventDefault();
        await create(newTask);
        setNewTask({
            header: "",
            description: "",
            dateEnd: "",
            userId: user.getUser.id,
            creator: user.getUser.login,
            responsible,
            status,
            priority
        });
    }

    useEffect(() => {
        if (update) {
            getTaskById(id)
                .then(data => {
                    setNewTask({
                        header: data.header,
                        description: data.description,
                        dateEnd: data.dateEnd,
                        userId: data.userId,
                        creator: data.login,
                        responsible,
                        status,
                        priority
                    });
                    setPriority(data.priority);
                    setStatus(data.status);
                    setResponsible(data.responsible);
                })
        }
    }, [id])

    const updateTask = async (event) => {
        event.preventDefault();
        await update({
            header: newTask.header,
            description: newTask.description,
            dateEnd: newTask.dateEnd,
            userId: user.getUser.id,
            creator: user.getUser.login,
            responsible,
            status,
            priority,
            id
        });

    }

    return (
        <form className="taskForm">
            <div className="taskForm_fields">

                <div className="boxInput-select">
                    <label>Заголовок</label>
                    <MyInput
                        value={newTask.header}
                        onChange={event => setNewTask({ ...newTask, header: event.target.value })}
                        placeholder="Введите заголовок"
                        {...props}
                    />
                </div>

                <div className="boxInput-select">
                    <label>Описание</label>
                    <MyInput
                        value={newTask.description}
                        onChange={event => setNewTask({ ...newTask, description: event.target.value })}
                        placeholder="Введите описание"
                        {...props}
                    />
                </div>

                <div className="boxInput-select">
                    <label>Дата окончания задачи</label>
                    <MyInput
                        value={newTask.dateEnd}
                        onChange={event => setNewTask({ ...newTask, dateEnd: event.target.value })}
                        type="date" placeholder="Введите дату окончания"
                        {...props}
                    />
                </div>

                <div className="boxInput-select">
                    <label>Приоритет</label>
                    <MySelect
                        defaultValue="Приоритет"
                        value={priority}
                        onChange={event => {
                            setPriority(event);
                            setNewTask({ ...newTask, priority: event });
                        }
                        }
                        options={[
                            { value: "Высокий", name: "Высокий" },
                            { value: "Средний", name: "Средний" },
                            { value: "Низкий", name: "Низкий" }
                        ]}
                        {...props}
                    />
                </div>
                <div className="boxInput-select">
                    <label >Статус</label>
                    <MySelect
                        defaultValue="Статус"
                        value={status}
                        onChange={event => {
                            setStatus(event);
                            setNewTask({ ...newTask, status: event });
                        }
                        }
                        options={[
                            { value: "К выполнению", name: "К выполнению" },
                            { value: "Выполняется", name: "Выполняется" },
                            { value: "Выполнена", name: "Выполнена" },
                            { value: "Отменена", name: "Отменена" }
                        ]}
                    />
                </div>

                <div className="boxInput-select">
                    <label htmlFor="">Ответственный</label>
                    <MySelect
                        defaultValue="Ответственный"
                        value={responsible}
                        onChange={event => {
                            setResponsible(event)
                            setNewTask({ ...newTask, responsible: event })
                        }
                        }
                        options={user.getSubordinates}
                        {...props}
                    />
                </div>
            </div>

            <div className="taskForm_button">
                {create
                    ? <MyButton onClick={addTask}>Добавить задачу</MyButton>
                    : <MyButton onClick={updateTask}>Обновить задачу</MyButton>
                }
            </div>

        </form>
    );
})

export default TaskForm;