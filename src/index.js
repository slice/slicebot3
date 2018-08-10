import sig from 'signale'
import Eris from 'eris'
import { resolve } from 'path'

import { read } from './config'
import register from './events/conn'

var config
const configPath = resolve(__dirname, '..', 'config.toml')

try {
  config = read(configPath)
} catch (err) {
  sig.error('failed to read config: %s', err)
  process.exit(-1)
}

const bot = new Eris.CommandClient(
  config.discord.token,
  { compress: true, disableEvents: { TYPING_START: true, USER_UPDATE: true } },
  {
    owner: config.discord.owner,
    prefix: config.discord.prefix,
  }
)

register(bot)

bot.unregisterCommand('help')
bot.registerCommand('ping', 'pong')

bot.connect()
