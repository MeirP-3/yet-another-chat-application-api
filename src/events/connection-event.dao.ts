import { DataTypes } from "sequelize";
import { sequelize } from '../db';

const ConnectionEvent = sequelize.define('connectionEvent', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING, // TODO learn about custom type
    allowNull: false
  }
});

export default ConnectionEvent;