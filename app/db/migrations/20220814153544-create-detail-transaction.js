'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transaction: {
        type: Sequelize.INTEGER,
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
      book: {
        type: Sequelize.INTEGER,
         allowNull:false,
        validate:{
            notEmpty: true,
        }
      },
      titleBook: {
        type: Sequelize.STRING,
         allowNull:false,
        validate:{
            notEmpty: true,
        }
      },
      imageBook: {
        type: Sequelize.STRING,
         allowNull:false,
        validate:{
            notEmpty: true,
        }
      },
      priceBook: {
        type: Sequelize.INTEGER,
         allowNull:false,
        validate:{
            notEmpty: true,
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('DetailTransactions');
  }
};