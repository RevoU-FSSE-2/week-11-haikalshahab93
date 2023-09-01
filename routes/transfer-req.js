const { Router } = require('express');
const { createTransfer, getAllTransfer, updateTransferStatus, deleteTransfer, getTransferHistory } = require('../controller/transfer.js');
const { authorizationMiddleware } = require('../middleware/auth.js');

const transfeReqRouter = Router();

transfeReqRouter.post('/', authorizationMiddleware({ roles: ['maker', 'approver', 'admin'] }), createTransfer);
transfeReqRouter.get('/', authorizationMiddleware({ roles: ['maker', 'approver', 'admin'] }), getAllTransfer);
transfeReqRouter.get('/history', authorizationMiddleware({ roles: ['admin'] }), getTransferHistory);
transfeReqRouter.patch('/:id', authorizationMiddleware({ roles: ['approver', 'admin'] }), updateTransferStatus);
transfeReqRouter.delete('/:id', authorizationMiddleware({ roles: ['admin'] }), deleteTransfer);

module.exports = transfeReqRouter;