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
        /**
         * Passing the name and not an object makes the type to fallback to 'token'
         */
        authorizer: 'customLambdaAuthorizer',
      },
    },
  ],
}
export default outlays
