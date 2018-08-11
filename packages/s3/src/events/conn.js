import sig from 'signale'

export default (bot) => {
  bot.on('connect', (shard) => {
    sig.pending('shard %d connecting', shard)
  })

  bot.on('error', (err, shard) => {
    sig.error('error on shard %d: %s', shard, err)
  })

  bot.on('warn', (message, shard) => {
    sig.warn('warning on shard %d: %s', shard, message)
  })

  bot.on('disconnect', () => {
    sig.info('disconnected')
  })

  bot.on('ready', () => {
    sig.success('bot ready')
  })
}
