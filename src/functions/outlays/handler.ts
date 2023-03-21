import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { CreateOutlayPageDTO } from '@interfaces/dtos/create-outlay-dto'
import { createOutlayPage } from '@services/notion/create-outlay-page'

import schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let body: CreateOutlayPageDTO
  if (typeof event.body === 'string') body = JSON.parse(event.body) as CreateOutlayPageDTO
  else body = event.body as CreateOutlayPageDTO

  const { data, error } = await createOutlayPage(body)
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
