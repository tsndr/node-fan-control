const fs = require('fs')

module.exports = class Fan {
    
    path = ''

    constructor() {
        if (!this.getPath().length)
            throw 'PWM PATH NOT FOUND!'
        this.enableFans()
    }

    getFans() {
        return [
            { id: 2, name: 'CPU_FAN'},
            { id: 3, name: 'EXT_FAN'},
            { id: 7, name: 'AIO_PUMP'}
        ]
    }

    getPath() {
        if (this.path.length)
            return this.path
        const baseDir = `/sys/class/hwmon`
        const subDirs = fs.readdirSync(baseDir)
        for (const subDir of subDirs) {
            if (fs.existsSync(`${baseDir}/${subDir}/pwm1`)) {
                this.path = `${baseDir}/${subDir}`
                return this.path
            }
        }
        return this.path
    }

    enableFans() {
        for (const fan of this.getFans()) {
            fs.writeFileSync(`${this.path}/pwm${fan.id}_enable`, 1)
        }
    }

    getRpm(id) {
        const file = `${this.path}/fan${id}_input`
        if (!fs.existsSync(file))
            return false
        return fs.readFileSync(file, { encoding: 'utf8' }).trim() || false
    }

    getPwm(id) {
        const file = `${this.path}/pwm${id}`
        if (!fs.existsSync(file))
            return false
        return fs.readFileSync(file, { encoding: 'utf8' }).trim() || false
    }

    setPwm(id, pwm) {
        const file = `${this.path}/pwm${id}`
        if (!fs.existsSync(file) || pwm < 0 || pwm > 255)
            return false
        try {
            fs.writeFileSync(file, pwm)
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }
    
}