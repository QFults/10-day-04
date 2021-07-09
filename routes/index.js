const router = require('express').Router()

router.use('/api', require('./transactionRoutes.js'))

module.exports = router
