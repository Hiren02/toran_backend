'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('products');

    await queryInterface.createTable(
      'products',
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
          defaultValue: 'direct',
        },
        channel: {
          field: 'channel',
          type: Sequelize.STRING,
        },
        companyId: {
          field: 'company_id',
          type: Sequelize.STRING,
        },
        title: {
          field: 'title',
          type: Sequelize.STRING,
        },
        description: {
          field: 'description',
          type: Sequelize.STRING,
        },
        brand: {
          field: 'brand',
          type: Sequelize.STRING,
        },
        type: {
          field: 'type',
          type: Sequelize.STRING,
        },
        handle: {
          field: 'handle',
          type: Sequelize.STRING,
        },
        status: {
          field: 'status',
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        tags: {
          field: 'tags',
          type: Sequelize.STRING,
        },
        productUrl: {
          field: 'product_url',
          type: Sequelize.STRING,
        },
        price: {
          field: 'price',
          type: Sequelize.FLOAT,
        },
        currencyCode: {
          field: 'currency_code',
          type: Sequelize.STRING,
        },
        createdAt: {
          field: 'created_at',
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          field: 'updated_at',
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
    await queryInterface.dropTable('products');
  },
};
