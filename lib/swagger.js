import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// import productRoute from './modules/product/productRoute.js';
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
  },
  apis: ['./modules/product/productRoute.js'],
};

const specs = swaggerJsdoc(options);

export default function initializeSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
