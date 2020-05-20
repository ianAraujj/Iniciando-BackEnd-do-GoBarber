import Sequelize, {Model} from 'sequelize';

class Agendamento extends Model{
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE
      },
      {
        sequelize,
      }
    )


    return this;
  }

  static associate(models){
    
    this.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user'
    });

    this.belongsTo(models.User, {
      foreignKey: 'id_provider',
      as: 'provider'
    })
  }

}

export default Agendamento;
