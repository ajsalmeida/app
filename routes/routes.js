const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService.js');


transactionRouter.post('/create', transactionService.create);
transactionRouter.get('/findAll', transactionService.findAll);
transactionRouter.get('/findYearMonth/:period', transactionService.findYearMonth);
transactionRouter.put('/update/:id', transactionService.update);
transactionRouter.delete('/delete/:id', transactionService.remove);

module.exports = transactionRouter;
