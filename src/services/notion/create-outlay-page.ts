import type { CreateOutlayPageDTO } from '@interfaces/dtos/create-outlay-dto'
import { environment } from '../../environment'
import { notionClient } from './client'

export const createOutlayPage = async (data: CreateOutlayPageDTO, yearPageId: string, cardPaymentPageId: string) => {
  return notionClient.pages.create({
    parent: { database_id: environment.notion.outlaysDatabaseId },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: data.name,
            },
          },
        ],
      },
      'Purchase Date': {
        date: { start: data.date },
      },
      Tags: {
        multi_select: data.tags.map(tag => ({ name: tag })),
      },
      'Price (average)': {
        number: data.price,
      },
      'Payment method': {
        select: { name: data.paymentMethod },
      },
      'Purchase year': {
        relation: [{ id: yearPageId }],
      },
      ...(cardPaymentPageId && {
        'Card Payments': {
          relation: [{ id: cardPaymentPageId }],
        },
      }),
    },
  })
}
