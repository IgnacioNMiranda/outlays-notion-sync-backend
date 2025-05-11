import { handlerPath } from '@libs/handler-resolver'
import type { AWS } from '@serverless/typescript'

export const authorizer: AWS['functions'][0] = {
  memorySize: 256,
  timeout: 10,
  handler: `${handlerPath(__dirname)}/handler.main`,
}
export default authorizer
