import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

export default User;
