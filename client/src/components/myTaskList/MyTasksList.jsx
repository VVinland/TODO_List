import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Context } from "../..";
import MyTaskItem from "../MyTaskItem";
import { fetchTasksByResponsible } from "../../http/taskApi";
import "./../../style/tasksList.css";

const MyTasksList = observer(() => {

    const { user, task } = useContext(Context);

    useEffect(() => {
        fetchTasksByResponsible(user.getUser.login)
            .then(data => {
                task.setMyTasks(data)
                task.setFilterMyTasks([]);
            })
    }, [user.getUser.id, user.getUser.login])

    

    return (
        <div className="myTaskList">
            <h1>Мои задачи:</h1>
            {task.getMyTasks.map(item => {
                return <MyTaskItem
                    key={item.id}
                    header={item.header}
                    description={item.description}
                    dateEnd={item.dateEnd}
                    status={item.status}
                    priority={item.priority}
                    responsible={item.responsible}
                    id={item.id}
                />
            }
            )}
        </div>
    );
})

export default MyTasksList;