import { notionClient } from './client'

export const createCardPaymentPage = (name: string, parentDatabaseId: string) => {
  return notionClient.pages.create({
    parent: {
      database_id: parentDatabaseId,
    },
    properties: {
      Date: {
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
