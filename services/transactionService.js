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
const findAll = async (__req, res) => {
    try {
        const data = await TransactionModel.find();
        res.send(data);
    } catch (error) {
        res.send('Houve um erro:' + error);
    }

};
//retorna a entrada buscada no banco de dados
const findYearMonth = async (req, res) => {
    try {
        const period = req.params.yearmonth;
        const data = await TransactionModel.find({ yearMonth: period });
        //console.log(data);
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
    try {
        const description = req.body.description;
        const data = await TransactionModel.findOneAndUpdate({ description: description }, req.body, { new: true });
        if (!data) {
            res.status(500).send('ocorreu um erro ao atualizar a entrada');
        } else {
            res.send(data);
        }
    } catch (error) {
        res.status(500).send('Ocorreu um erro: ' + error);
    }
};

//remove uma entrada no banco de dados
const remove = async (req, res) => {
    try {
        const description = req.body.description;
        const data = await TransactionModel.findOneAndRemove({ description: description });
        if (!data) {
            res.status(500).send('Erro ao deletar registro');
        } else {
            res.send('Registro deletado com sucesso');
        }

    } catch (error) {
        res.status(500).send('Ocorreu um erro: ' + error);
    }
};
module.exports = {
    create,
    findAll,
    findYearMonth,
    update,
    remove
};
