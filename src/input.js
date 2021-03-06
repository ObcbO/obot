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
            mcs.cmd("----- HELP ?????? -----")
            mcs.cmd("|.bot [type/help]  --?????????????????????")
            mcs.cmd("|.follow [??????]  --??????????????????")
            mcs.cmd("|.go x y z  --??????????????????")
            mcs.cmd("|.help  --????????????")
            mcs.cmd("|.kill ??????  --??????????????????(????????????????????????)")
            mcs.cmd("|.owner [??????]  --??????")
            mcs.cmd("|.say ??????  --????????????")
            mcs.cmd("|.stop  --????????????")
            mcs.cmd("|.exit  --???????????????")
            mcs.cmd("-------- END --------")
            break
        case ".kill":
            if (noc) {
                if (noc == bot.username) {
                    mcs.cmd("?????????????????????")
                } else {
                    mcs.cmd("???????????????????????? ID: " + noc)
                    bot.pvp.attack(bot.players[noc].entity)
                }
            }
            break
        case ".owner":
            if (!noc) {
                if (!global.owner && typeof (global.owner) == "undefined") {
                    mcs.error("BOT????????????????????? ????????? '/owner ??????' ?????????")
                } else mcs.cmd("Owner: " + global.owner)
            } else {
                global.owner = noc
                mcs.cmd("???????????? Owner: " + global.owner)
            }
            break
        case ".say":
            if (noc) {
                mcs.cmd("?????????????????????")
                bot.chat(noc)
            } else {
                mcs.cmd("??????????????????????????????????????????")
            }
            break
        case ".stop":
            bot.pvp.stop()
            bot.pathfinder.setGoal(null)
            break
        case ".exit":
            bot.end
            mcs.cmd("??????????????????????????????")
            break
        default:
            mcs.cmd("??????????????????????????? .help ????????????")
    }
}