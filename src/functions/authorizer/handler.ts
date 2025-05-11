import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from 'aws-lambda'
import { environment } from '../../environment'

const handler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
  const policy: APIGatewayAuthorizerResult = {
    principalId: 'anonymous',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: event.methodArn,
        },
      ],
    },
  }

  if (event.authorizationToken === `Bearer ${environment.authToken}`) return policy

  policy.policyDocument.Statement[0].Effect = 'Deny'
  return policy
}

export const main = handler
