'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Books',
      [{
        title: 'Davic Bach: Faktor Latte',
        author: 'David Bach',
        image: '/upload/image 1.png',
        publish: new Date(),
        price: 90,
        stock: 100,
        user: 1,
        category: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: '"Selena" dan "Nebula"',
        author: 'TERE LIYE',
        image: '/upload/image 2.png',
        publish: new Date(),
        price: 90,
        stock: 100,
        user: 1,
        category: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Pelukis Bisu (The Silent Patient)',
        author: 'Alex Michaelides',
        image: '/upload/image 3.png',
        publish: new Date(),
        price: 90,
        stock: 100,
        user: 1,
        category: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Kecambuk Dara (Trouble Blood)',
        author: 'Robert Galbraith',
        image: '/upload/image 2.png',
        publish: new Date(),
        price: 90,
        stock: 100,
        user: 1,
        category: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Kitab Kawin (Edisi Cover Baru)',
        author: 'Laksmi Pamuntjak',
        image: '/upload/image 2.png',
        publish: new Date(),
        price: 90,
        stock: 100,
        user: 1,
        category: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Salvation of a Saint',
        author: 'Keigo Higashino',
        image: '/upload/image 2.png',
        publish: new Date(),
        price: 90,
        stock: 100,
        user: 1,
        category: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Books', null, {});

  }
};