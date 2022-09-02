'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice: {
        type: Sequelize.STRING,
         allowNull:false,
        validate:{
            notEmpty: true,
        }
      },
      user: {
        type: Sequelize.INTEGER,
         allowNull:false,
        validate:{
            notEmpty: true,
        }
      },
      date: {
        type: Sequelize.DATE,
         allowNull:false,
        validate:{
            notEmpty: true,
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};