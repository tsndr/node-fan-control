const express = require('express')
const router = express.Router()

const TempController = require('../controllers/TempController')

router.get('/', TempController.getCores)

module.exports = router