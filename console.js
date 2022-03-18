const colors = require('colors-console')
module.exports = {
    info,
    chat,
    log,
    waring,
    cmd
}
function info(msg) {
    console.log(colors('blue', '[INFO] ') + msg)
}
function chat(username, msg) {
    console.log(colors('green', '[CHAT] ') + colors('grey', username) + colors('grey', ': ') + msg)
}
function log(msg) {
    console.log(colors('yellow', '[LOG] ' + msg))
}
function waring(msg) {
    console.log(colors('red', '[WARING] ' + msg))
}
function cmd(msg) {
    console.log(colors('magenta', '[CMD] ') + msg)
}