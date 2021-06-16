'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("ALTER TABLE `delivery`  ADD CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`IdDistributor`) REFERENCES `distributor` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,  ADD CONSTRAINT `delivery_ibfk_2` FOREIGN KEY (`IdWorkman`) REFERENCES `workman` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;")
    await queryInterface.sequelize.query("ALTER TABLE `delivery_composition`    ADD CONSTRAINT `delivery_composition_ibfk_1` FOREIGN KEY (`IdDelivery`) REFERENCES `delivery` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,    ADD CONSTRAINT `delivery_composition_ibfk_2` FOREIGN KEY (`IdProduct`) REFERENCES `product` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;  ")
    await queryInterface.sequelize.query("ALTER TABLE `product`    ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`IdCategory`) REFERENCES `category` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,    ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`IdUnit`) REFERENCES `unit` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;  ")
    
    await queryInterface.sequelize.query("ALTER TABLE `product_distributor`    ADD CONSTRAINT `product_distributor_ibfk_1` FOREIGN KEY (`IdDistributor`) REFERENCES `distributor` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,    ADD CONSTRAINT `product_distributor_ibfk_2` FOREIGN KEY (`IdProduct`) REFERENCES `product` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;")
    await queryInterface.sequelize.query("ALTER TABLE `product_position`    ADD CONSTRAINT `product_position_ibfk_1` FOREIGN KEY (`IdPosition`) REFERENCES `position` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,    ADD CONSTRAINT `product_position_ibfk_2` FOREIGN KEY (`IdProduct`) REFERENCES `product` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;")
    await queryInterface.sequelize.query("ALTER TABLE `workman`    ADD CONSTRAINT `workman_ibfk_1` FOREIGN KEY (`IdPosition`) REFERENCES `workman_position` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;")
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("ALTER TABLE delivery DROP FOREIGN KEY delivery_ibfk_1;")
    await queryInterface.sequelize.query("ALTER TABLE delivery DROP FOREIGN KEY delivery_ibfk_2;")
    await queryInterface.sequelize.query("ALTER TABLE delivery_composition DROP FOREIGN KEY delivery_composition_ibfk_1;")
    await queryInterface.sequelize.query("ALTER TABLE delivery_composition DROP FOREIGN KEY delivery_composition_ibfk_2;")
    await queryInterface.sequelize.query("ALTER TABLE product DROP FOREIGN KEY product_ibfk_1;")
    await queryInterface.sequelize.query("ALTER TABLE product DROP FOREIGN KEY product_ibfk_2;")
    await queryInterface.sequelize.query("ALTER TABLE product_distributor DROP FOREIGN KEY product_distributor_ibfk_1;")
    await queryInterface.sequelize.query("ALTER TABLE product_distributor DROP FOREIGN KEY product_distributor_ibfk_2;")
    await queryInterface.sequelize.query("ALTER TABLE product_position DROP FOREIGN KEY product_position_ibfk_1;")
    await queryInterface.sequelize.query("ALTER TABLE product_position DROP FOREIGN KEY product_position_ibfk_2;")
    await queryInterface.sequelize.query("ALTER TABLE workman DROP FOREIGN KEY workman_ibfk_1;")
  }
};
