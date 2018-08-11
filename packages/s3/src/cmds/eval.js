/* eslint-disable no-eval */

import { inspect as _inspect } from 'util'

function wrapCode(string) {
  return '```js\n' + string + '\n```'
}

function inspect(things) {
  return _inspect(things, {
    depth: 5,
    maxArrayLength: 20,
  })
}

function stringify(result, censor) {
  const inspected = inspect(result)
  const replaced = inspected.replace(new RegExp(censor, 'g'), '...')
  return replaced
}

export default (bot) => [
  async (msg, parts) => {
    const js = parts.join(' ')

    try {
      /* eslint-disable no-unused-vars */
      const author = msg.author
      const channel = msg.channel
      const member = msg.member

      let result = eval(js)
      if (result instanceof Promise) {
        result = await result
      }

      const stringified = stringify(result, bot.token)

      if (stringified.length > 7000000) {
        await msg.channel.createMessage('Result was too big (> 7MB).')
        return
      }

      if (stringified.length > 2000) {
        await msg.channel.createMessage('', {
          name: 'output.txt',
          file: Buffer.from(stringified, 'utf-8'),
        })
        return
      }

      await msg.channel.createMessage(wrapCode(stringified))
    } catch (err) {
      await msg.channel.createMessage(err.toString())
    }
  },
  {
    aliases: ['js'],
    requirements: { userIDs: ['97104885337575424'] },
  },
]
