//Import packages
const tmi = require('tmi.js')
const fs = require('fs')

//Init new tmi.js client
var tmiclient = new tmi.client(require('./configs/tmi.json').options)

//Get channel list
const channels = require('./configs/channels.json')

//If log directory does not exist, create it
if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs')
}

//Define start function
var start = async (channels, cb) => {

    //Connect to Twitch servers
    await tmiclient.connect()
        .catch(err => {
            console.error(err)
        })

    console.log('Connected to Twitch')

    //For every channel in channel list, join it
    for (let channel of channels) {
        console.log(`Joining ${channel}`)
        tmiclient.join(channel)
            .catch(err => {
                console.error(err)
            })
    }

    //When tmi.js reconnects to twitch, log it to console
    tmiclient.on("reconnect", () => {
        console.log('\n\x1b[31mReconnecting...')
    });

    //Event when any message gets deleted
    tmiclient.on("messagedeleted", (ch, username, message, userstate) => {

        //Remove # from channel name
        ch = ch.split('#').join('')

        //Log message to console
        console.log(`\n\x1b[36m[\x1b[34m${ch}\x1b[36m] \x1b[32m${username} \x1b[33m> \x1b[37m${message}`)

        //Init new Date object
        let d = new Date()

        //Define variables for hours, minutes, and seconds
        let h = d.getHours()
        let m = d.getMinutes()
        let s = d.getSeconds()

        //If h, m, or s are lower than 10, put a 0 in front
        if (h < 10) h = `0${h}`
        if (m < 10) m = `0${m}`
        if (s < 10) s = `0${s}`

        //Define path of log file
        let file = `./logs/${ch}/${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}.log`

        //If logs/channelname does not exist, create it
        if (!fs.existsSync(`./logs/${ch}`)) {
            fs.mkdirSync(`./logs/${ch}`)
        }

        //If log file does not exist, create it as empty file
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, '')
        }

        //Append log entry to log file
        fs.appendFileSync(file, `[${h}:${m}:${s}] ${username} > ${message}\n\n`)

    })

    //Callback (Because deprecation warnings are annoying)
    cb(true)

}

//Start logging
start(channels, () => {
    return
})