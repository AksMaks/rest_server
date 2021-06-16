'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("ALTER TABLE `category`      ADD PRIMARY KEY (`Id`);")
    await queryInterface.sequelize.query("ALTER TABLE `delivery`      ADD PRIMARY KEY (`Id`),      ADD KEY `Id_workman` (`IdWorkman`),      ADD KEY `Id_distributor` (`IdDistributor`);")
    await queryInterface.sequelize.query("ALTER TABLE `delivery_composition`    ADD PRIMARY KEY (`Id`),    ADD KEY `id_delivery` (`IdDelivery`),    ADD KEY `id_product` (`IdProduct`);")
    await queryInterface.sequelize.query("ALTER TABLE `distributor`    ADD PRIMARY KEY (`Id`);")
    await queryInterface.sequelize.query("ALTER TABLE `position`    ADD PRIMARY KEY (`Id`);")
    await queryInterface.sequelize.query("ALTER TABLE `product`    ADD PRIMARY KEY (`Id`),    ADD KEY `id_category` (`IdCategory`),    ADD KEY `id_unit` (`IdUnit`);")
    await queryInterface.sequelize.query("ALTER TABLE `product_distributor`    ADD PRIMARY KEY (`Id`),    ADD KEY `id_product` (`IdProduct`),    ADD KEY `id_distributor` (`IdDistributor`);")
    await queryInterface.sequelize.query("ALTER TABLE `product_position`    ADD PRIMARY KEY (`Id`),    ADD KEY `id_position` (`IdPosition`),    ADD KEY `id_product` (`IdProduct`);")
    await queryInterface.sequelize.query("ALTER TABLE `unit`    ADD PRIMARY KEY (`Id`);")
    await queryInterface.sequelize.query("ALTER TABLE `workman`    ADD PRIMARY KEY (`Id`),    ADD KEY `id_position` (`IdPosition`);")
    await queryInterface.sequelize.query("ALTER TABLE `workman_position`    ADD PRIMARY KEY (`Id`);")
    await queryInterface.sequelize.query("ALTER TABLE `category`  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;")
    await queryInterface.sequelize.query("ALTER TABLE `delivery`  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;")
    await queryInterface.sequelize.query("ALTER TABLE `delivery_composition`  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;")
    await queryInterface.sequelize.query("ALTER TABLE `distributor`  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;")
    await queryInterface.sequelize.query("ALTER TABLE `position`  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;")
    await queryInterface.sequelize.query("ALTER TABLE `product`  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;")
    await queryInterface.sequelize.query("ALTER TABLE `product_distributor`  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;")
    await queryInterface.sequelize.query("ALTER TABLE `product_position`  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;")
    await queryInterface.sequelize.query("ALTER TABLE `unit`  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;")
    await queryInterface.sequelize.query("ALTER TABLE `workman`  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;")
    await queryInterface.sequelize.query("ALTER TABLE `workman_position`  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;")
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("ALTER TABLE `category` DROP PRIMARY KEY")
    await queryInterface.sequelize.query("ALTER TABLE `delivery` DROP PRIMARY KEY")
    await queryInterface.sequelize.query("ALTER TABLE `delivery` DROP INDEX `Id_workman`")
    await queryInterface.sequelize.query("ALTER TABLE `delivery` DROP INDEX `Id_distributor`")
    await queryInterface.sequelize.query("ALTER TABLE `delivery_composition` DROP PRIMARY KEY")
    await queryInterface.sequelize.query("ALTER TABLE `delivery_composition` DROP INDEX `id_delivery`")
    await queryInterface.sequelize.query("ALTER TABLE `delivery_composition` DROP INDEX `id_product`")
    await queryInterface.sequelize.query("ALTER TABLE `distributor` DROP PRIMARY KEY")
    await queryInterface.sequelize.query("ALTER TABLE `position` DROP PRIMARY KEY")
    await queryInterface.sequelize.query("ALTER TABLE `product` DROP PRIMARY KEY")
    await queryInterface.sequelize.query("ALTER TABLE `product` DROP INDEX `id_category`")
    await queryInterface.sequelize.query("ALTER TABLE `product` DROP INDEX `id_unit`")
    await queryInterface.sequelize.query("ALTER TABLE `product_distributor` DROP PRIMARY KEY")
    await queryInterface.sequelize.query("ALTER TABLE `product_distributor` DROP INDEX `id_product`")
    await queryInterface.sequelize.query("ALTER TABLE `product_distributor` DROP INDEX `id_distributor`")
    await queryInterface.sequelize.query("ALTER TABLE `product_position` DROP PRIMARY KEY")
    await queryInterface.sequelize.query("ALTER TABLE `product_position` DROP INDEX `id_product`")
    await queryInterface.sequelize.query("ALTER TABLE `product_position` DROP INDEX `id_position`")
    
    await queryInterface.sequelize.query("ALTER TABLE `unit` DROP PRIMARY KEY")
    await queryInterface.sequelize.query("ALTER TABLE `workman` DROP PRIMARY KEY")
    await queryInterface.sequelize.query("ALTER TABLE `workman` DROP INDEX `id_position`")
    await queryInterface.sequelize.query("ALTER TABLE `workman_position` DROP PRIMARY KEY")
   
  }
};
