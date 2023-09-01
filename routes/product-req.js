const { Router } = require('express');
const { createProduct, getAllProduct, updateProductStatus, deleteProduct, getProductHistory,jualBeliProductStatus } = require('../controller/product.js');
const { authorizationMiddleware } = require('../middleware/auth.js');

const productionReqRouter = Router();

productionReqRouter.post('/', authorizationMiddleware({ roles: ['approver', 'admin'] }), createProduct);
productionReqRouter.get('/', authorizationMiddleware({ roles: ['maker', 'approver', 'admin'] }), getAllProduct);
productionReqRouter.get('/history', authorizationMiddleware({ roles: ['admin'] }), getAllProduct);
productionReqRouter.patch('/:id', authorizationMiddleware({ roles: ['approver', 'admin'] }), jualBeliProductStatus);
productionReqRouter.delete('/:id', authorizationMiddleware({ roles: ['admin'] }), deleteProduct);
// productionReqRouter.patch('/jualbeli/:id', authorizationMiddleware({ roles: ['admin'] }), jualBeliProductStatus);

module.exports = productionReqRouter;


