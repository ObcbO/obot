const mineflayer = require('mineflayer')
const {
    send
} = require('process')
const pvp = require('mineflayer-pvp').plugin
const autoEat = require('mineflayer-auto-eat')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const goals = require('mineflayer-pathfinder').goals

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

//my
const input = require('./input')
const mcs = require('./output')

//������js�����Է���b
global.bot = bot
global.pvp = pvp
global.pathfinder = pathfinder
global.Movements = Movements
global.goals = goals

//��ʼ��
var owner
global.owner = owner
// Require MCData and set pathfinder movements
global.mcData = require('minecraft-data')(bot.version)

//����̨����
input.sendmessage()

//����̨��Ϣ��ʾ
bot.on('message', async (game_info) => {
    mcs.info(game_info)
})
//����̨������ʾ
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

    setInterval(() => {
        const mobFilter = e => e.type === 'mob' && e.mobType === 'Zombie'
        const mob = bot.nearestEntity(mobFilter)
        if (!mob) return;
        const pos = mob.position;
        bot.lookAt(pos, true, () => {
            bot.attack(mob);
        });
    }, 1000);
})