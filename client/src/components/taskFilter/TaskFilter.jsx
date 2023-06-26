import { useContext, useEffect, useState } from 'react';
import './taskFilter.css';
import { Context } from '../..';
import { observer } from 'mobx-react';

const TaskFilter = observer(({ myTaskClasses, subordinatesTaskClasses }) => {
    const { task, user } = useContext(Context);
    const [filterDateEnd, setFilterDateEnd] = useState("");
    const classes = ["taskFilter"];

    if (myTaskClasses) {
        classes.push(myTaskClasses)
    } else if (subordinatesTaskClasses) {
        classes.push(subordinatesTaskClasses)
    }

    useEffect(() => {
        if (task.getFilterTasksSubordinates.length === 0) {
            task.setFilterTasksSubordinates(task.getTasksSubordinates);
        }

        if (task.getFilterMyTasks.length === 0) {
            task.setFilterMyTasks(task.getMyTasks)
        }

        if (filterDateEnd === "today") {
            task.getTasksSubordinates.forEach(item => console.log(item.dateEnd))
            const today = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate());
            if (subordinatesTaskClasses) {
                task.setTasksSubordinates(task.getFilterTasksSubordinates.filter(item => item.dateEnd === today))
            } else if (myTaskClasses) {
                task.setMyTasks(task.getFilterMyTasks.filter(item => item.dateEnd === today))
            }
        } else if (filterDateEnd === "onTheWeek") {
            const today = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate());
            const tod = new Date();
            const week = new Date();
            week.setDate(tod.getDate() + 7);
            const onTheWeek = week.getFullYear() + '-' + (week.getMonth() < 10 ? '0' + (1 + week.getMonth()) : week.getMonth()) + '-' + (week.getDate() < 10 ? '0' + week.getDate() : week.getDate());
            if (subordinatesTaskClasses) {
                task.setTasksSubordinates(task.getFilterTasksSubordinates.filter(item => (item.dateEnd >= today) && (item.dateEnd < onTheWeek)));
            } else {
                task.setMyTasks(task.getFilterMyTasks.filter(item => (item.dateEnd >= today) && (item.dateEnd < onTheWeek)));
            }
        } else if (filterDateEnd === "inFuture") {

            var today = new Date();
            var week = new Date();
            week.setDate(today.getDate() + 7);
            const inFuture = week.getFullYear() + '-' + (week.getMonth() < 10 ? '0' + (1 + week.getMonth()) : week.getMonth()) + '-' + (week.getDate() < 10 ? '0' + week.getDate() : week.getDate());
            if (subordinatesTaskClasses) {
                task.setTasksSubordinates(task.getFilterTasksSubordinates.filter(item => item.dateEnd >= inFuture));
            } else {
                task.setMyTasks(task.getFilterMyTasks.filter(item => item.dateEnd >= inFuture));
            }
        } else if (filterDateEnd === "inPast") {
            task.getTasksSubordinates.forEach(item => console.log(item.dateEnd))
            const today = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate());
            if (subordinatesTaskClasses) {
                task.setTasksSubordinates(task.getFilterTasksSubordinates.filter(item => item.dateEnd < today))
            } else {
                task.setMyTasks(task.getFilterMyTasks.filter(item => item.dateEnd < today))
            }
        }
    }, [filterDateEnd])


    const filterByResponsible = () => {
        if (task.getFilterTasksSubordinates.length === 0) {
            task.setFilterTasksSubordinates(task.getTasksSubordinates);
        }
        const result = [];
        let arrayResponsible = user.getSubordinates.map(item => item.login);
        arrayResponsible.sort();
        const arrTasks = task.getTasksSubordinates;
        for (let i = 0; i < arrayResponsible.length; i++)
            for (let j = 0; j < arrTasks.length; j++) {
                if (arrTasks[j].responsible === arrayResponsible[i]) {
                    result.push(arrTasks[j])
                }
            }
        task.setTasksSubordinates(result);
    }

    const filterWithoutGroupings = () => {
        let result = [];
        if (subordinatesTaskClasses) {
            if (task.getFilterTasksSubordinates.length !== 0) {
                result = task.getFilterTasksSubordinates.sort((a, b) => {
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                });
                task.setTasksSubordinates(result);
            } else {
                result = task.getTasksSubordinates.sort((a, b) => {
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                });
                task.setTasksSubordinates(result);
            }
        } else {
            if (task.getFilterMyTasks.length !== 0) {
                result = task.getFilterMyTasks.sort((a, b) => {
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                });
                task.setMyTasks(result);
            } else {
                result = task.getMyTasks.sort((a, b) => {
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                });
                task.setMyTasks(result);
            }
        }
    }

    return (
        <div className={classes.join(' ')}>
            <select
                value={filterDateEnd}
                onChange={event => setFilterDateEnd(event.target.value)}
            >
                <option value="" hidden>По дате завершения</option>
                <option value="today" >Сегодня</option>
                <option value="onTheWeek" >На неделе</option>
                <option value="inFuture" >На будущем</option>
                <option value="inPast" >В прошлом</option>
            </select>

            {subordinatesTaskClasses && <button onClick={filterByResponsible}>Отображение по ответственным</button>}

            <button onClick={filterWithoutGroupings}>Без группировок</button>
        </div>
    );
})

export default TaskFilter;