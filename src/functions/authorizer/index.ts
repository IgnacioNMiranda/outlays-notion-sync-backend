import { handlerPath } from '@libs/handler-resolver'

export default {
  memorySize: 256,
  timeout: 10,
  handler: `${handlerPath(__dirname)}/handler.main`,
}
