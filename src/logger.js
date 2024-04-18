import winston from 'winston'

const { combine, timestamp, label, printf } = winston.format
const formatLog = printf(({level, message, label, timestamp}) => {
  return `${timestamp} [${label}] ${level} ${message}`
})

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'book-store-api.log' })
  ],
  format: combine(
    label({ label: 'Book Store API'}),
    timestamp(),
    formatLog
  )
})

export default global.logger



