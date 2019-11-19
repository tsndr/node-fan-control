const temp = require('../model/Temp')

module.exports = new class {

    getCores(req, res) {
        const cores = temp.getCores()
        res.json(cores)
    }

}