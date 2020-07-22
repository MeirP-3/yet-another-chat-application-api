import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db';

class Message extends Model {


  static async getLast50() {

    const last10Messages = await this.findAll(
      {
        limit: 50,
        order: [['createdAt', 'ASC']]
      }
    );

    return last10Messages;
  }
  

  static async saveMessage({ from, content }): Promise<any> {

    const message = await this.create(
      {
        from,
        content
      }
    );
  
    return message.toJSON();
  }

}


Message.init({
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
}, { sequelize, modelName: 'message' });


export default Message;