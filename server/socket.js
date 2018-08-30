const c = require('../constants')

module.exports = function (socket, robot) {
  
  socket.on(c.KEY_PRESS, action => {
    let alt = action.alt
    let ctrl = action.ctrl
    let shift = action.shift
    let command = action.command
    let key = action.key

    if (alt) robot.keyToggle('alt', 'down')
    if (ctrl) robot.keyToggle('control', 'down')
    if (shift) robot.keyToggle('shift', 'down')
    if (command) robot.keyToggle('command', 'down')

    if (key) {
      robot.keyTap(key)
    }

    if (alt) robot.keyToggle('alt', 'up')
    if (ctrl) robot.keyToggle('control', 'up')
    if (shift) robot.keyToggle('shift', 'up')
    if (command) robot.keyToggle('command', 'up')
    return false
  })

  socket.on('single_key', function(key){
    console.log('single_key: ' + key );
    robot.keyTap(key);
  });
}
