'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("CREATE TABLE `category` (`Id` int(11) NOT NULL, `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;");
    await queryInterface.sequelize.query("CREATE TABLE `delivery` (`Id` int(11) NOT NULL, `Date` datetime NOT NULL, `IdWorkman` int(11) NOT NULL,`IdDistributor` int(11) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
    await queryInterface.sequelize.query("CREATE TABLE `delivery_composition` ( `Id` int(11) NOT NULL,`IdDelivery` int(11) NOT NULL,`IdProduct` int(11) NOT NULL, `Number` int(11) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8;")
    await queryInterface.sequelize.query("CREATE TABLE `distributor` ( `Id` int(11) NOT NULL,`Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;")
    await queryInterface.sequelize.query("CREATE TABLE `position` (      `Id` int(11) NOT NULL,      `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Должность работника' ROW_FORMAT=COMPACT;")
    await queryInterface.sequelize.query("CREATE TABLE `product` (      `Id` int(11) NOT NULL,      `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,      `IdCategory` int(11) NOT NULL,      `IdUnit` int(11) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8;")
    await queryInterface.sequelize.query("CREATE TABLE `product_distributor` (      `Id` int(11) NOT NULL,      `IdProduct` int(11) NOT NULL,      `IdDistributor` int(11) NOT NULL    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;")
    await queryInterface.sequelize.query("CREATE TABLE `product_position` (      `Id` int(11) NOT NULL,      `IdPosition` int(11) NOT NULL,      `IdProduct` int(11) NOT NULL    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;")
    await queryInterface.sequelize.query("CREATE TABLE `unit` (      `Id` int(11) NOT NULL,      `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `Temp1` INT(11) NOT NULL DEFAULT '0'    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;")
    await queryInterface.sequelize.query("    CREATE TABLE `workman` (      `Id` int(11) NOT NULL,      `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,      `IdPosition` int(11) DEFAULT NULL    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;")
    await queryInterface.sequelize.query("CREATE TABLE `workman_position` (      `Id` int(11) NOT NULL,      `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;")
    
    /*
    await queryInterface.createTable('Category', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
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
    */
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('category');
    await queryInterface.dropTable('delivery');
    await queryInterface.dropTable('delivery_composition');
    await queryInterface.dropTable('distributor');
    await queryInterface.dropTable('position');
    await queryInterface.dropTable('product');
    await queryInterface.dropTable('product_distributor');
    await queryInterface.dropTable('product_position');
    await queryInterface.dropTable('unit');
    await queryInterface.dropTable('workman');
    await queryInterface.dropTable('workman_position');
  }
};