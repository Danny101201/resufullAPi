import pino from 'pino';
import pretty from 'pino-pretty';
import dayjs from 'dayjs';
const stream = pretty({
  colorize: true
})
const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime:true,
    }
  }
})
export default log