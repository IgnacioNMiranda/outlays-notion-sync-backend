import { notionClient } from './client'

export const createYearPage = (yearName: string, parentDatabaseId: string) => {
  return notionClient.pages.create({
    parent: {
      database_id: parentDatabaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: yearName,
            },
          },
        ],
      },
    },
  })
}
