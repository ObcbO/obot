const mcs = require('./console')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
module.exports = {
    sendmessage,
    command
}

var noc

bot.loadPlugin(pathfinder)

function sendmessage() {
    readline.question(``, async msg => {
        if (msg.slice(0, 1) == ".") {
            noc = msg.slice(msg.trim().split(" ")[0].length + 1)
            command(msg.trim().split(" "))
        } else bot.chat(msg)
        sendmessage()
    })
}

function announceArrived() {
    const botPosition = bot.entity.position
    mcs.cmd(`Arrived, "Position " + bot.entity.position`)
}

function command(text) {
    switch (text[0]) {
        case ".go":
            bot.pathfinder.setMovements(new Movements(bot, mcData))
            bot.pathfinder.goto(new GoalNear(text[1], text[2], text[3])).then(announceArrived)
            break
        case ".help":
            mcs.cmd("----- HELP 帮助 -----")
            mcs.cmd(".go x y z  --前往某个位置")
            mcs.cmd(".help  --查看帮助")
            mcs.cmd(".now [type/help]  --查看机器人信息")
            mcs.cmd(".owner [玩家]  --主人")
            mcs.cmd(".say 消息  --发送消息")
            mcs.cmd("-------- END --------")
            break
        case ".now":
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
                    mcs.cmd("Position " + bot.entity.position)
                    break
                default:
                    mcs.cmd("Name " + bot.username)
                    mcs.cmd("Health " + bot.health + "/20")
                    mcs.cmd("Food " + bot.food + "/20")
                    mcs.cmd("Oxygen " + bot.oxygenLevel)
                    mcs.cmd("Exp " + bot.experience.points)
                    mcs.cmd("Time " + bot.oxygenLevel)
                    mcs.cmd("Position " + bot.entity.position)
            }
            break
        case ".owner":
            if (noc !== null) {
                onwer = noc
                mcs.cmd("设置成功 Owner: " + owner)
            } else {
                if (owner === null) {
                    mcs.error("BOT还没有设置主人 请使用 '/owner 玩家' 来设置")
                } else mcs.cmd("Owner: " + owner)
            }
            break
        case ".say":
            mcs.cmd("已发送消息文本")
            bot.chat(noc)
            break
        default:
            mcs.cmd("错误的命令，请输入 .help 查看帮助")
    }
}