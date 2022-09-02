'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
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
      category: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true,
        }
      },
      author: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty: true,
        }
      },
      image: {
        type: Sequelize.TEXT,
        allowNull:false,
        validate:{
            notEmpty: true,
        }
      },
      publish: {
        type: Sequelize.DATE,
        allowNull:false,
        validate:{
            notEmpty: true,
        }
      },
      price: {
        type: Sequelize.INTEGER,
         allowNull:false,
        validate:{
            notEmpty: true,
        }
      },
      stock: {
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
    await queryInterface.dropTable('Books');
  }
};