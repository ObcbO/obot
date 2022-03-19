const mcs = require('./output')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
module.exports = {
    sendmessage,
    handling
}

var noc

function sendmessage() {
    readline.question(``, async msg => {
        if (msg.slice(0, 1) == ".") {
            handling(msg)
        } else bot.chat(msg)
        sendmessage()
    })
}

function handling(msg) {
    noc = msg.slice(msg.trim().split(" ")[0].length + 1)
    command(msg.trim().split(" "))
}

function command(text) {
    switch (text[0]) {
        case ".bot":
            switch (noc) {
                case "food":
                    mcs.cmd("Food " + bot.food + "/20")
                    break
                case "exp":
                    mcs.cmd("Exp " + bot.experience.points)
                    break
                case "health":
                    mcs.cmd("Health " + bot.health + "/20")
                    break
                case "help":
                    mcs.cmd("Now Types: food, exp, health, name, oxygen, time, position")
                    break
                case "name":
                    mcs.cmd("Name " + bot.username)
                    break
                case "oxygen":
                    mcs.cmd("Oxygen " + bot.oxygenLevel)
                    break
                case "time":
                    mcs.cmd("Time " + bot.oxygenLevel)
                    break
                case "position":
                    mcs.cmd("Position " + bot.entity.position + "(" + bot.game.dimension + ")")
                    break
                default:
                    mcs.cmd("Name " + bot.username)
                    mcs.cmd("Health " + bot.health + "/20")
                    mcs.cmd("Food " + bot.food + "/20")
                    mcs.cmd("Oxygen " + bot.oxygenLevel)
                    mcs.cmd("Exp " + bot.experience.points)
                    mcs.cmd("Time " + bot.oxygenLevel)
                    mcs.cmd("Position " + bot.entity.position + "(" + bot.game.dimension + ")")
            }
            break
        case ".follow":
            const player = bot.players[text[1]]
            if (!player || !player.entity) {
                mcs.cmd("Can't find " + text[1])
                return
            }
            const mcData = require('minecraft-data')(bot.version)
            const movements = new Movements(bot, mcData)            
            movements.scafoldingBlocks = []
            bot.pathfinder.setMovements(movements)
            const goal = new goals.GoalFollow(player.entity, 1)
            bot.pathfinder.setGoal(goal, true)
            break
        case ".go":
            bot.pathfinder.setGoal(new goals(text[1], text[2], text[3], 1))
            mcs.cmd("End. Position: " + bot.entity.position)
            break
        case ".":
        case ".help":
            mcs.cmd("----- HELP 帮助 -----")
            mcs.cmd("|.bot [type/help]  --查看机器人信息")
            mcs.cmd("|.follow [玩家]  --跟随某个玩家")
            mcs.cmd("|.go x y z  --前往某个位置")
            mcs.cmd("|.help  --查看帮助")
            mcs.cmd("|.kill 玩家  --杀死某个玩家(在视距范围内寻找)")
            mcs.cmd("|.owner [玩家]  --主人")
            mcs.cmd("|.say 消息  --发送消息")
            mcs.cmd("|.stop  --停止追杀")
            mcs.cmd("|.exit  --退出服务器")
            mcs.cmd("-------- END --------")
            break
        case ".kill":
            if (noc) {
                if (noc == bot.username) {
                    mcs.cmd("不能自己杀自己")
                } else {
                    mcs.cmd("即将开始追杀玩家 ID: " + noc)
                    bot.pvp.attack(bot.players[noc].entity)
                }
            }
            break
        case ".owner":
            if (!noc) {
                if (!global.owner && typeof (global.owner) == "undefined") {
                    mcs.error("BOT还没有设置主人 请使用 '/owner 玩家' 来设置")
                } else mcs.cmd("Owner: " + global.owner)
            } else {
                global.owner = noc
                mcs.cmd("设置成功 Owner: " + global.owner)
            }
            break
        case ".say":
            if (noc) {
                mcs.cmd("已发送消息文本")
                bot.chat(noc)
            } else {
                mcs.cmd("你好像还没有输入要发送的消息")
            }
            break
        case ".stop":
            bot.pvp.stop()
            bot.pathfinder.setGoal(null)
            break
        case ".exit":
            bot.end
            mcs.cmd("已断开与服务器的连接")
            break
        default:
            mcs.cmd("错误的命令，请输入 .help 查看帮助")
    }
}