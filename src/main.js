import program from 'commander'
import { VERSION } from './utils/constants'
import apply from './index'
import chalk from 'chalk'

/** 
 * xn commands
 *    - config
 *    - init
 */

let actionMap = {
  init: {
    description: 'generate a new project from a template',
    usages: [
      'xn init templateName projectName'
    ]
  },
  config: {
    alias: 'cfg',
    description: 'config .cvrc',
    usages: [
      'xn config set <k> <v>',
      'xn config get <k>',
      'xn config remove <k>'
    ]
  },
  // other commands
}

Object.keys(actionMap).forEach(action => {
  program.command(action)
  .description(actionMap[action].description)
  .alias(actionMap[action].alias)
  .action(() => {
    switch (action){
      case 'config':
        //  配置
        apply(action, ...process.argv.slice(3))
        break;
      case 'init':
        apply(action, ...process.argv.slice(3))
        break;
      default:
        break;
    }
  })
})

function help(){
  console.log('\r\nUsage:')
  Object.keys(actionMap).forEach(action => {
    actionMap[action].usages.forEach(usage => {
      console.log(' -' + usage)
    })
  })
  console.log('\r')
}

program.usage('<command> [options]')
program.on('-h', help)
program.on('--help', help)
program.version(VERSION, '-V --version').parse(process.argv)

// xn 不带参数时
if(!process.argv.slice(1).length) {
  program.outputHelp(make_green)
}
function make_green(txt){
  return chalk.green(txt)
}