'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'product_images',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        externalProductId: {
          field: 'external_product_id',
          type: Sequelize.STRING,
        },
        source: {
          field: 'source',
          type: Sequelize.ENUM('direct', 'api', 'public'),
        },
        productUrl: {
          field: 'product_url',
          type: Sequelize.STRING,
        },
        imageUrl: {
          field: 'image_url',
          type: Sequelize.STRING,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        schema: 'products',
        timestamps: false,
        underscored: true,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_images');
  },
};
