import { APIGatewaySimpleAuthorizerResult, APIGatewayTokenAuthorizerEvent } from 'aws-lambda'
import { environment } from '../../environment'

const handler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewaySimpleAuthorizerResult> => {
  if (event.authorizationToken !== `Bearer ${environment.authToken}`)
    return {
      isAuthorized: false,
    }

  return {
    isAuthorized: true,
  }
}

export const main = handler
