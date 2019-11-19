const Fan = require('../model/Fan')
const fan = new Fan

module.exports = new class {

    getFans(req, res) {
        console.log(fan.getPath())
        const fans = fan.getFans()
        res.json(fans)
    }

    getFan(req, res) {
        res.end()
    }
    
    getSpeed(req, res) {
        const speed = fan.getSpeed(req.params.fanId)
        res.json({
            speed
        })
    }

    getPwm(req, res) {
        const pwm = fan.getPwm(req.params.fanId)
        res.json({
            pwm
        })
    }

    getRpm(req, res) {
        const rpm = fan.getRpm(req.params.fanId)
        res.json({
            rpm
        })
    }

    setSpeed(req, res) {
        if (!fan.setPwm(req.params.fanId, req.params.speed))
            return res.status(400).end()
        res.status(204).end()
    }

}