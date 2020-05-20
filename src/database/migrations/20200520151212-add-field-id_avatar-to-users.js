'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', 
      'id_avatar',
      {
        type: Sequelize.INTEGER,
        references: {model: 'files', key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    )
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'id_avatar');
  }
};
