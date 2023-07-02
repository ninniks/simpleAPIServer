'use strict';
const bcrypt = require('bcrypt');
const {now} = require("sequelize/lib/utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     **/
    const hash = bcrypt.hashSync('password',10);
     await queryInterface.bulkInsert('users', [{
         firstName: 'Admin',
         lastName: 'Test',
         username: 'admin',
         email: 'admin@admin.com',
         password: hash,
         createdAt: now(),
         updatedAt: now()
     }], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('user', null, {});

  }
};
