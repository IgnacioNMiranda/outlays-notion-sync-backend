import { CreateOutlayPageDTO } from '@interfaces/dtos/create-outlay-dto'
import { environment } from '../../environment'
import { notionClient } from './client'

export const createOutlayPage = async (data: CreateOutlayPageDTO, yearPageId: string, cardPaymentPageId: string) => {
  return notionClient.pages.create({
    parent: { database_id: environment.notion.outlaysDatabaseId },
    properties: {
      [environment.notion.namePropertyKey]: {
        title: [
          {
            text: {
              content: data.name,
            },
          },
        ],
      },
      [environment.notion.datePropertyKey]: {
        date: { start: data.date },
      },
      [environment.notion.tagsPropertyKey]: {
        multi_select: data.tags.map((tag) => ({ name: tag })),
      },
      [environment.notion.pricePropertyKey]: {
        number: data.price,
      },
      [environment.notion.paymentMethodPropertyKey]: {
        select: { name: data.paymentMethod },
      },
      [environment.notion.purchaseYearPropertykey]: {
        relation: [{ id: yearPageId }],
      },
      ...(cardPaymentPageId && {
        [environment.notion.cardPaymentsPropertykey]: {
          relation: [{ id: cardPaymentPageId }],
        },
      }),
    },
  })
}
