document.addEventListener('DOMContentLoaded', async e => {
    const app = document.getElementById('app')

    const headline = document.createElement('H1')
    headline.innerText = "Fan Control"

    // const tempsElm = document.createElement('DIV')
    // tempsElm.className = 'temps'

    const fansElm = document.createElement('DIV')
    fansElm.className = 'fans'

    app.innerHTML = "";

    // const tempRes = await axios.get('/api/v1/temp')
    // const temps = tempRes.data

    // for (const temp of temps) {
    //     const tempDiv = document.createElement('DIV')
    //     tempDiv.innerHTML = `
    //         <div><b>${temp.label}:</b> ${temp.temp} &deg;C</div>
    //     `
    //     tempsElm.appendChild(tempDiv)
    // }

    const fansRes = await axios.get('/api/v1/fan')
    const fans = fansRes.data

    for (const fan of fans) {
        const fanPwmRes = await axios.get(`/api/v1/fan/${fan.id}/pwm`)
        const fanPwm = fanPwmRes.data.pwm
        const fanRpmRes = await axios.get(`/api/v1/fan/${fan.id}/rpm`)
        const fanRpm = fanRpmRes.data.rpm
        const fanDiv = document.createElement('DIV')
        fanDiv.className = 'fan'
        fanDiv.innerHTML = `
            <label for="fan_${fan.id}">${fan.name}</label>
            <div class="fan-values">
                <div class="fan-value">${Math.round(fanPwm / 255 * 100)}% (PWM: ${fanPwm})</div>
                <div class="fan-rpm">${fanRpm} rpm</div>
            </div>
            <input type="range" id="fan_${fan.id}" data-id="${fan.id}" min="0" max="255" value="${fanPwm}">
        `
        fanDiv.querySelector('input[type=range]').addEventListener('input', e => {
            const fanId = e.target.dataset.id
            const pwm = e.target.value
            axios.post(`/api/v1/fan/${fanId}/${pwm}`)
                .then(() => {
                    e.target.closest('.fan').querySelector('.fan-value').innerText = `${Math.round(pwm / 255 * 100)}% (${pwm})`
                })
                .catch(e => console.error(e))
        })
        fansElm.appendChild(fanDiv)
        setInterval(async () => {
            const fanRpmRes = await axios.get(`/api/v1/fan/${fan.id}/rpm`)
            const fanRpm = fanRpmRes.data.rpm
            fanDiv.querySelector('.fan-rpm').innerText = `${fanRpm} rpm`
        }, 1000)
    }
    app.appendChild(headline)
    // app.appendChild(tempsElm)
    app.appendChild(fansElm)
})