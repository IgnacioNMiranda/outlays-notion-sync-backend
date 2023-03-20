import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { CreateOutlayDTO } from './dtos/create-outlay-dto';

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let body: CreateOutlayDTO
  if (typeof event.body === 'string') body = JSON.parse(event.body) as CreateOutlayDTO
  else body = event.body as CreateOutlayDTO

  return formatJSONResponse({
    message: `Hello ${body.name}, welcome to the exciting Serverless world!`,
  });
};

export const main = middyfy(handler);
