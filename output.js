const colors = require('colors-console')
module.exports = {
    info,
    chat,
    error,
    warn,
    cmd,
    exec
}
var once
function c (type, msg) {
    type(msg)
}
function info(msg) {
    console.log(colors('blue', '[INFO] ') + msg)
}
function chat(username, msg) {
    console.log(colors('green', '[CHAT] ') + colors('grey', username) + colors('grey', ': ') + msg)
}
function warn(msg) {
    console.warn(colors('yellow', '[WARN] ' + msg))
}
function error(msg) {
    console.error(colors('red', '[ERROR] ' + msg))
}
function cmd(msg) {
    console.log(colors('magenta', '[CMD] ') + msg)
}
function exec(msg) {
    console.log(colors('cyan', '[EXEC] ' + msg))
}