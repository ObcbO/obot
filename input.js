const mcs = require('./console')
const {
    pathfinder,
    Movements,
    goals
} = require('mineflayer-pathfinder')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
module.exports = {
    sendmessage
}

var noc

function sendmessage() {
    readline.question(``, msg => {
        if (msg.slice(0,1) == ".") {
            noc = msg.slice(msg.trim().split(" ")[0].length + 1)
            command(msg.trim().split(" "))
        } else bot.chat(msg)
        sendmessage()
    })
}

function command (text) {
    switch (text[0]) {
        case ".go":
            bot.pathfinder.goto(text[1], text[2], text[3])
            break
        case ".help":
            mcs.cmd("----- HELP 帮助 -----")
            mcs.cmd(".go x y z  --前往某个位置")
            mcs.cmd(".help  --查看帮助")
            mcs.cmd(".now [type/help]  --查看机器人信息")
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
        case ".say":
            mcs.cmd("已发送消息文本")
            bot.chat(noc)
            break
        default:
            mcs.cmd("错误的命令，请输入 .help 查看帮助")
    }
}