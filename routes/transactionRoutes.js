const router = require('express').Router()
const { Transaction } = require('../models')

router.get('/transactions', (req, res) => {
  Transaction.find({})
    .then(transactions => res.json(transactions))
    .catch(err => console.log(err))
})

router.post('/transactions', (req, res) => {
  Transaction.create(req.body)
    .then(transaction => res.json(transaction))
    .catch(err => console.log(err))
})

module.exports = router
