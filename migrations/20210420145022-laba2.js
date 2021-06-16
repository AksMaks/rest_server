'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("ALTER TABLE `unit` ADD `Temp2` INT(11) NOT NULL DEFAULT '0' AFTER `Name`;")
    await queryInterface.sequelize.query("ALTER TABLE `unit` DROP `Temp1`;")
    await queryInterface.sequelize.query("ALTER TABLE `unit` CHANGE `Name` `Name` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;")
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("ALTER TABLE `unit` DROP `Temp2`")
    await queryInterface.sequelize.query("ALTER TABLE `unit` ADD `Temp1` INT(11) NOT NULL DEFAULT '0' AFTER `Name`;")
    await queryInterface.sequelize.query("ALTER TABLE `unit` CHANGE `Name` `Name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;")
  }
};
