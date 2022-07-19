import config from 'config'
import mongoose from 'mongoose'
import log from './logger'
async function connectDB() {
  let url = config.get<string>('Customer.DbUrl')
  try {
    await mongoose.connect(url)
    log.info('connect to db')
  } catch (err) {
    log.error('Could not connect to database');
    process.exit(1);
  }
}
export default connectDB