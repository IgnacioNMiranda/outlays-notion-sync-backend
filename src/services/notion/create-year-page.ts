import { environment } from '../../environment'
import { notionClient } from './client'

export const createYearPage = (yearName: string, parentDatabaseId: string) => {
  return notionClient.pages.create({
    parent: {
      database_id: parentDatabaseId,
    },
    properties: {
      [environment.notion.yearsNamePropertyKey]: {
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
