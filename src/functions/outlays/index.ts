import { handlerPath } from '@libs/handler-resolver'
import { AWS } from '@serverless/typescript'
import schema from './schema'

const outlays: AWS['functions'][0] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'outlays',
        private: true,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
        authorizer: {
          name: 'customLambdaAuthorizer',
          type: 'request',
        },
      },
    },
  ],
}
export default outlays
