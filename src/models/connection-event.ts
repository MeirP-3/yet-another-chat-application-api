import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

class ConnectionEvent extends Model {
  static async saveEvent({ type, name }) {
    await this.create({ type, name });
  };
}


ConnectionEvent.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING, // TODO learn about custom type
    allowNull: false
  }
}, { sequelize, modelName: 'connectionEvent', charset: 'utf8mb4' });


export default ConnectionEvent;

