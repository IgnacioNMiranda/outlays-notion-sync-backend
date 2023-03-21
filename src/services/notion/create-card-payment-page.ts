import { environment } from '../../environment'
import { notionClient } from './client'

export const createCardPaymentPage = (name: string, parentDatabaseId: string) => {
  return notionClient.pages.create({
    parent: {
      database_id: parentDatabaseId,
    },
    properties: {
      [environment.notion.cardPaymentsNamePropertyKey]: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    },
  })
}
