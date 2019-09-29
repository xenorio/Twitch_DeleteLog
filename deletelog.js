const tmi = require('tmi.js')
const fs = require('fs')

var tmiclient = new tmi.client(require('./configs/tmi.json').options)

const channels = require('./configs/channels.json')

if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs')
}

var start = async (channels, cb) => {

    await tmiclient.connect()
        .catch(err => {
            console.error(err)
        })

    console.log('Connected to Twitch')

    for (let channel of channels) {
        console.log(`Joining ${channel}`)
        tmiclient.join(channel)
            .catch(err => {
                console.error(err)
            })
    }




    tmiclient.on("reconnect", () => {
        console.log('\n\x1b[31mReconnecting...')
    });



    tmiclient.on("messagedeleted", (ch, username, message, userstate) => {

        ch = ch.split('#').join('')

        console.log(`\n\x1b[36m[\x1b[34m${ch}\x1b[36m] \x1b[32m${username} \x1b[33m> \x1b[37m${message}`)

        let d = new Date()

        let h = d.getHours()
        let m = d.getMinutes()
        let s = d.getSeconds()

        if (h < 10) h = `0${h}`
        if (m < 10) m = `0${m}`
        if (s < 10) s = `0${s}`

        let file = `./logs/${ch}/${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}.log`

        if (!fs.existsSync(`./logs/${ch}`)) {
            fs.mkdirSync(`./logs/${ch}`)
        }

        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, '')
        }

        fs.appendFileSync(file, `[${h}:${m}:${s}] ${username} > ${message}\n\n`)


    })

    cb(true)

}


start(channels, () => {
    return
})