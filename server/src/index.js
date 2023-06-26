import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {sequelize} from './db.js';
import{
    User,
    Task
} from './models/models.js';
import router from './routes/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/api',router)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server running on PORT=${PORT}`));
    } catch (error) {
        console.log(error);
    }
}


start();
