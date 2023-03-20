import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { CreateOutlayDTO } from '@interfaces/dtos/create-outlay-dto';

import schema from './schema';
import { createOutlay } from '../../services/notion/common';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let body: CreateOutlayDTO
  if (typeof event.body === 'string') body = JSON.parse(event.body) as CreateOutlayDTO
  else body = event.body as CreateOutlayDTO

  const outlay = await createOutlay(body)

  return formatJSONResponse({
    message: `Hello ${body.name}, welcome to the exciting Serverless world!`,
    outlay
  });
};

export const main = middyfy(handler);
