const fs = require('fs')

module.exports = new class {

    path = '/sys/class/hwmon/hwmon1'

    getCores() {
        const labels = fs.readdirSync(this.path).filter(file => file.startsWith('temp') && file.endsWith('_label'))
        const temps = fs.readdirSync(this.path).filter(file => file.startsWith('temp') && file.endsWith('_input'))
        const cores = [];
        for (const labelFile of labels) {
            const id = labelFile.replace('temp', '').replace('_label', '')
            const label = fs.readFileSync(`${this.path}/${labelFile}`, { encoding: 'utf8' }).trim()
            const temp = fs.readFileSync(`${this.path}/temp${id}_input`, { encoding: 'utf8' })
            cores.push({
                label,
                temp: parseFloat(temp / 1000)
            })
        }
        return cores
    }

}