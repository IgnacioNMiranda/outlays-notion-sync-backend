import { APIGatewayRequestAuthorizerEventV2, APIGatewaySimpleAuthorizerResult } from 'aws-lambda'
import { environment } from '../../environment'

const handler = async (event: APIGatewayRequestAuthorizerEventV2): Promise<APIGatewaySimpleAuthorizerResult> => {
  if (
    !event.identitySource ||
    typeof event.identitySource !== 'string' ||
    event.identitySource !== `Bearer ${environment.authToken}`
  )
    return {
      isAuthorized: false,
    }

  return {
    isAuthorized: true,
  }
}

export const main = handler
