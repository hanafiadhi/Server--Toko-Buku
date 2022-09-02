'use strict';
const bcrpyt = require('bcryptjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrpyt.hashSync('rahasia',10);
    await queryInterface.bulkInsert(
      'Users',
      [{
        id: 1,
        name: 'Jhon Doe',
        email: 'admin@gmail.com',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};