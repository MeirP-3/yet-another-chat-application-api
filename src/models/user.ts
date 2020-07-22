import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db';

class User extends Model {

  static async register(username: string) {

    try {
      const newUser = this.build({username});
      await newUser.save();
  
      return {
        success: true
      };

    } catch (error) {
      if (!(error?.name?.includes('UniqueConstraintError'))) {
        throw error;
      }
  
      return {
        success: false,
        message: 'nickname currently in use'
      }
    }
  }


  static async unregister(username: string) {
    const result = await this.destroy({ where: { username } });
  
    if (result !== 1) {
      throw new Error(`unexpected result: ${result} from delete user ${username}. expected 1`);
    }
  }
}


User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }  
}, { sequelize, modelName: 'user' });


export default User;