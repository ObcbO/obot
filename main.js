const mineflayer = require('mineflayer')
const {
    send
} = require('process')
const pvp = require('mineflayer-pvp').plugin
const autoEat = require('mineflayer-auto-eat')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const {
    GoalNear
} = require('mineflayer-pathfinder').goals

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'ChinaTrump',
    port: 25565,
    enableServerListing: false
})

//load plugins
bot.loadPlugin(autoEat)
bot.loadPlugin(pathfinder)
bot.loadPlugin(pvp)

//让所有js都可以访问b
global.bot = bot
global.pvp = pvp
global.pathfinder = pathfinder
global.Movements = Movements
global.GoalNear = GoalNear

//my
const input = require('./input')
const mcs = require('./output')

//初始化
var owner
global.owner = owner
// Require MCData and set pathfinder movements
global.mcData = require('minecraft-data')(bot.version)

//控制台输入
input.sendmessage()

//控制台信息显示
bot.on('message', async (game_info) => {
    mcs.info(game_info)
})
//控制台聊天显示
bot.on('chat', async (username, message) => {
    mcs.chat(username, message)
})
bot.on('whisper', async (username, message) => {
    mcs.whisper(username, message)
    if (username === bot.username) return
    if (message.slice(0, 1) == "." && username == global.owner) input.handling(message)
})

bot.on('kicked', function (reason) {
    mcs.error("BOT IS KICKED. Reason:" + reason)
})
bot.on('error', (err) => {
    mcs.error(err)
})
bot.on('spawn', () => {
    bot.on('death', function () {
        mcs.warn("DEATH Position " + bot.entity.position)
    })
    bot.on('forcedMove', function () {
        mcs.warn("Robot is in " + bot.entity.position)
    })
    //eat
    bot.on('autoeat_started', () => {
        console.warn('Auto Eat started!')
    })
    bot.on('autoeat_stopped', () => {
        console.warn('Auto Eat stopped!')
    })
    bot.on('health', async () => {
        mcs.warn("Health " + bot.health + "/20")
        if (bot.food === 20) {
            bot.autoEat.disable()
        } else {
            bot.autoEat.enable()
        }
    })
})