const mineflayer = require('mineflayer')
const {
    pathfinder,
    Movements,
    goals
} = require('mineflayer-pathfinder')
const {
    send
} = require('process')
const pvp = require('mineflayer-pvp').plugin
const autoEat = require('mineflayer-auto-eat')

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'ChinaTrump',
    port: 25565,
})

//my
module.exports = {
    chat
}
const input = require('./input')
const mcs = require('./console')

//load plugin
bot.loadPlugin(autoEat)

function chat(msg) {
    bot.chat(msg)
}

//初始化


//控制台输入
input.sendmessage()

//控制台信息显示
bot.on('message', (game_info) => {
    mcs.info(game_info)
})
//控制台聊天显示
bot.on('chat', (username, message) => {
    mcs.chat(username, message)
})
bot.on('kicked', function (reason) {
    mcs.waring("BOT IS KICKED. Reason:" + reason)
})
bot.on('error', (err) => {
    mcs.waring(err)
})
bot.on('death', function () {
    mcs.log("DEATH")
})
bot.on('forcedMove', function () {
    mcs.log("Robot is in " + bot.entity.position)
})
//eat
bot.on('autoeat_started', () => {
    console.log('Auto Eat started!')
})
bot.on('autoeat_stopped', () => {
    console.log('Auto Eat stopped!')
})
bot.on('health', () => {
    if (bot.food === 20) {
        bot.autoEat.disable()
    } else {
        bot.autoEat.enable()
    }
})