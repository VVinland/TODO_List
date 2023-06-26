import bctrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/models.js';

dotenv.config();

const generateJWT = (id, login) => {
    return jwt.sign(
        { id, login },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class userController {

    async registration(req, res, next) {
        const { firstName, middleName, lastName, login, password, supervisor } = req.body;
        if (!login || !password) {
            return res.json({ message: 'Не ввели логин или пароль' })
        }
        const condidate = await User.findOne({ where: { login } });
        if (condidate) {
            return res.json({ message: 'Пользователь с таким логином уже существует' })
        }
        const hashPassword = await bctrypt.hash(password, 5);
        const user = await User.create({
            firstName,
            middleName,
            lastName,
            login,
            password: hashPassword,
            supervisor
        })
        const token = generateJWT(user.id, user.login)
        return res.json({ token });
    }

    async login(req, res, next) {
        const { login, password } = req.body;
        const user = await User.findOne({ where: { login } });
        if (!user) {
            return res.json({ message: "Пользователя с таким логином нет" })
        }
        const comparePassword = await bctrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.json({ message: "Не верный пароль" })
        }
        const token = generateJWT(user.id, user.login);
        return res.json({ token });
    }

    
    async checkAuth(req, res, next) {
        const token = generateJWT(req.user.id, req.user.login);
        return res.json({ token });
    }

    async getSubordinatesBySupervisor(req, res, next) {
        try{
            const loginSupervisor = req.user.login;
            const users = await User.findAll({where:{supervisor:loginSupervisor}})
            return res.json(users);
        }catch(error){
            console.log(error.message);
        }
    }


}

export default new userController();