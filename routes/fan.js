const express = require('express')
const router = express.Router()

const FanController = require('../controllers/FanController')

router.get('/', FanController.getFans)
router.get('/:fanId', FanController.getFan)
router.get('/:fanId/pwm', FanController.getPwm)
router.get('/:fanId/rpm', FanController.getRpm)
router.post('/:fanId/:speed', FanController.setSpeed)

module.exports = router