const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService.js');


transactionRouter.post('/create', transactionService.create);
transactionRouter.get('/findAll', transactionService.findAll);
transactionRouter.get('/findYearMonth/:yearmonth', transactionService.findYearMonth);
transactionRouter.put('/update', transactionService.update);
transactionRouter.delete('/delete', transactionService.remove);

module.exports = transactionRouter;
