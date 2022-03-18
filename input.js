const bot = require('./app')
const mcs = require('./console')
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
            noc = msg.slice(msg.trim().split(" ")[0].length)
            command(msg.trim().split(" "))
        } else bot.chat(msg)
        sendmessage()
    })
}

function command (text) {
    switch (text[0]) {
        case ".help":
            mcs.cmd("在做了在做了")
            break
        case ".say":
            mcs.cmd("已发送消息文本")
            bot.chat(noc)
        break
        default:
            mcs.cmd("错误的命令，请输入 .help 查看帮助")
    }
}