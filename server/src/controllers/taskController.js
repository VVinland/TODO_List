import { Task } from "../models/models.js";

class taskController {

    async create(req, res, next) {
        try {
            const {
                header,
                description,
                dateEnd,
                priority,
                status,
                creator,
                responsible,
                userId } = req.body;
            if (!header || !description || !dateEnd || !priority || !status || !creator || !responsible) {
                return res.json({ message: "Не все ввели данные" })
            }
            const task = await Task.create({
                header,
                description,
                dateEnd,
                priority,
                status,
                creator,
                responsible,
                userId
            })
            return res.json(task);
        } catch (error) {
            return res.json(error.message);
        }
    }

    async fetchTasksById(req, res, next) {
        try {
            const { id } = req.body;
            const tasks = await Task.findAll({ where: { userId: id } })
            return res.json(tasks)
        } catch (error) {
            res.json(error.message)
        }
    }

    async fetchTasksByResponsible(req, res, next) {
        try {
            const { login } = req.body;
            const tasks = await Task.findAll({ where: { responsible: login } })
            return res.json(tasks)
        } catch (error) {
            res.json({ message: error.message })
        }
    }

    async updateTask(req, res, next) {
        try {
            const { header,
                description,
                dateEnd,
                priority,
                status,
                creator,
                responsible,
                userId,
                id } = req.body;

            if (!header || !description || !dateEnd || !priority || !status || !creator || !responsible || !userId) {
                return res.json({ message: "Не все ввели данные" })
            }

            const patch = await Task.update({
                header,
                description,
                dateEnd,
                priority,
                status,
                creator,
                responsible,
                userId,
            },
                {
                    where: { id },
                    returning: true,
                    plain: true
                })
            return res.json(patch)
        } catch (error) {
            return res.json({message:error.message});
        }
    }

    async deleteTaskById(req, res, next) {
        try {
            const { id } = req.body;
            await Task.destroy({ where: { id } })
            return res.json({ message: "Удаление прошло успешно" });
        } catch (error) {
            return res.json({ message: error.message })
        }
    }

    async updateTaskStatus(req, res, next) {
        try {
            const { status, id } = req.body;
            if (!status) {
                return res.json({ message: "Статус пустой" })
            }
            const taskStatus = await Task.update(
                { status },
                {
                    where: { id },
                    returning: true,
                    plain: true
                })
            return res.json(taskStatus);
        } catch (error) {
            return res.json(error.message);
        }
    }

    async getOneTask(req, res, next) {
        try {
            const { id } = req.body;
            if (!id) {
                return res.json('Пустой')
            }
            const task = await Task.findOne({ where: { id } })
            return res.json(task)
        } catch (error) {
            console.log(error);
        }
    }
}



export default new taskController();