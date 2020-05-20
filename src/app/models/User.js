import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model{
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize,
      }
    )

    /*todos os usuários antes de serem salvos, irão passar por aqui*/
    this.addHook('beforeSave', async (user) =>{
      
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    })

    return this;
  }

  static associate(models){
    this.belongsTo(models.File, {
      foreignKey: 'id_avatar'
    });
  }

  checkHash(password){
    return bcrypt.compare(password, this.password_hash);
  }

}

export default User;
