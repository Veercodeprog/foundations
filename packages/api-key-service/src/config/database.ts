import { registerAs } from '@nestjs/config'

export default registerAs('database', () => {
  return {
    region: process.env.DYNAMO_DB_REGION || '',
  }
})
