const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const TransactionModel = require('../models/TransactionModel');

//cria uma nova entrada no banco de dados
const create = async (req, res) => {
    try {
        const transaction = new TransactionModel({
            description: req.body.description,
            value: req.body.value,
            category: req.body.category,
            year: req.body.year,
            month: req.body.month,
            day: req.body.day,
            yearMonth: req.body.yearMonth,
            yearMonthDay: req.body.yearMonthDay,
            type: req.body.type
        });
        const data = await transaction.save();
        if (!data) {
            res.status(500).send('Erro ao tentar escrever no banco de dados');
        } else {
            res.send(data);
        }
    } catch (error) {
        res.status(500).send('Ocorreu um erro ao escrever os dados:' + error);
    }

}

//retorna todas as entradas do banco de dados
const findAll = async (req, res) => {
    try {
        const data = await TransactionModel.find();
        res.send(JSON.stringify(data));
    } catch (error) {
        res.send('Houve um erro:' + error);
    }

};
//retorna a entrada buscada no banco de dados
const findYearMonth =  async (req, res) => {
    try {
        //explode
        const period = req.params.yearmonth.split('-');
        const year = period[0];
        const month = period[1];
        const yearMonth = year + '-'+ month;

        const data = await TransactionModel.find({yearMonth: yearMonth});
        console.log(data);
        if (!data) {
            res.status(500).send('Ocorreu um erro ao buscar valores');
        }
        else {
            res.send(data);
        }
    } catch (error) {
        res.send('Ocorreu um erro ao tentar encontrar as entradas:' + error);
    }
};

//atualiza uma entrada no banco de dados
const update = async (req, res) => {

};

//remove uma entrada no banco de dados
const remove = async (req, res) => {

};
module.exports = {
    create,
    findAll,
    findYearMonth,
    update,
    remove
};
