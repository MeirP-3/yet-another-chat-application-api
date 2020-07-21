import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

const Message = sequelize.define('message', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.VIRTUAL,
    get() {
      return 'message'
    }
  }
});

export default Message;