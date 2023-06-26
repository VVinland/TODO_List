import {DataTypes} from 'sequelize';
import {sequelize} from '../db.js';

const Task = sequelize.define('task',{
    header:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false},
    dateEnd:{type:DataTypes.DATEONLY, allowNull:false},
    priority:{type:DataTypes.STRING, allowNull:false},
    status:{type:DataTypes.STRING, allowNull:false},
    creator:{type:DataTypes.STRING, defaultValue:'user'},
    responsible:{type:DataTypes.STRING, defaultValue:'user'}
})

const User = sequelize.define('user',{
    firstName:{type:DataTypes.STRING, allowNull:false},
    middleName:{type:DataTypes.STRING, allowNull:false},
    lastName:{type:DataTypes.STRING, allowNull:false},
    login:{type:DataTypes.STRING, unique:true, allowNull:false},
    password: { type: DataTypes.STRING, allowNull:false},
    // role:{type:DataTypes.STRING, defaultValue:'user'},
    supervisor:{type:DataTypes.STRING, defaultValue:'user'}
})


User.hasMany(Task);
Task.belongsTo(User);

export{
    User,
    Task
}