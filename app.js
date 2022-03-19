const mineflayer = require('mineflayer')
const {
    send
} = require('process')
const pvp = require('mineflayer-pvp').plugin
const autoEat = require('mineflayer-auto-eat')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'ChinaTrump',
    port: 25565,
})
//让所有js都可以访问b
global.bot = bot
global.pathfinder = pathfinder
global.Movements = Movements
global.GoalNear = GoalNear

//my
const input = require('./input')
const mcs = require('./console')

//load plugins
bot.loadPlugin(autoEat)
bot.loadPlugin(pathfinder)

//初始化
global.onwer
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
    if (owner == username) {
        input.command(message)
    }
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
bot.on('health', async () => {
    if (bot.food === 20) {
        bot.autoEat.disable()
    } else {
        bot.autoEat.enable()
    }
})