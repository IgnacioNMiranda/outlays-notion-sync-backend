import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { CreateOutlayDTO } from '@interfaces/dtos/create-outlay-dto'

import schema from './schema'
import { createOutlay } from '../../services/notion/common'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let body: CreateOutlayDTO
  if (typeof event.body === 'string') body = JSON.parse(event.body) as CreateOutlayDTO
  else body = event.body as CreateOutlayDTO

  const { data, error } = await createOutlay(body)
  if (error)
    return formatJSONResponse(
      {
        message: error,
      },
      400,
    )

  return formatJSONResponse(
    {
      message: `'${body.name}' outlay created.`,
      data,
    },
    200,
  )
}

export const main = middyfy(handler)
