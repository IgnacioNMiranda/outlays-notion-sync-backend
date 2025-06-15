import type { CreateOutlayPageDTO } from '@interfaces/dtos/create-outlay-dto'
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { createOutlayPage } from '@services/notion/create-outlay-page'

import type { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints'
import { environment } from '../../environment'
import { getCardPaymentPageId, getTagsAndPaymentMethods, getYearPageId } from '../../services/notion/utils'
import type schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  let body: CreateOutlayPageDTO
  if (typeof event.body === 'string') body = JSON.parse(event.body) as CreateOutlayPageDTO
  else body = event.body as CreateOutlayPageDTO

  try {
    const { tags, paymentMethods } = await getTagsAndPaymentMethods()

    if (!body.tags.every(tag => tags.find(notionTag => notionTag === tag))) throw new Error('Invalid Tags')
    if (!body.paymentMethod) body.paymentMethod = 'Transfer'
      else if (!paymentMethods.includes(body.paymentMethod)) throw new Error('Invalid Payment Method')

    const createOutlay = async (data: CreateOutlayPageDTO, date: Date) => {
      const year = `${date.getFullYear()}`
      let monthName = date.toLocaleString('en-US', { month: 'long' })
      // date.getDate() starts in 0
      if (date.getDate() + 1 >= environment.notion.creditChargeDay) {
        const dateWithPlusMonth = new Date(date)
        // If the credit charge day has passed, the outlay has to be considered for the next month
        dateWithPlusMonth.setMonth(date.getMonth() + 1)
        monthName = dateWithPlusMonth.toLocaleString('en-US', { month: 'long' })
      }

      const cardPaymentPageId = await getCardPaymentPageId(data.paymentMethod, monthName, year)
      const yearPageId = await getYearPageId(year)
      return createOutlayPage(data, yearPageId, cardPaymentPageId)
    }

    const installments = body.installments ?? 1
    let price = body.price / installments
    if (body.type === 'Refund') price = price * -1

    const outlaysPromises: Promise<CreatePageResponse>[] = []
    for (let i = 0; i < installments; i++) {
      const outlayName = `${body.name}${installments > 1 ? ` (${i + 1})` : ''}`
      const outlayDate = new Date(body.date)

      if (i > 0) {
        outlayDate.setMonth(outlayDate.getMonth() + i)
      }

      const outlayData: CreateOutlayPageDTO = {
        ...body,
        name: outlayName,
        date: outlayDate.toISOString().split('T')[0],
        price,
      }

      console.info(`Creating '${outlayData.name}' Outlay`)
      outlaysPromises.push(createOutlay(outlayData, outlayDate))
    }
    const outlays = await Promise.all(outlaysPromises)
    console.info(`'${body.name}' Outlay created`)

    return formatJSONResponse(
      {
        message: `'${body.name}' outlay created.`,
        data: outlays,
      },
      200,
    )
  } catch (error) {
    return formatJSONResponse(
      {
        message: error.errorMessage ?? error.message ?? error,
      },
      400,
    )
  }
}

export const main = middyfy(handler)
