import { CreateOutlayDTO } from '@interfaces/dtos/create-outlay-dto'
import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints'
import { environment } from '../../environment'
import { notionClient } from './client'

export const createOutlay = async (data: CreateOutlayDTO): Promise<{ data: CreatePageResponse; error: string }> => {
  try {
    const outlay = await notionClient.pages.create({
      parent: { database_id: environment.notion.databaseId },
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
          date: { start: data.customDate },
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
      },
    })
    return { data: outlay, error: '' }
  } catch (error) {
    return { data: null, error }
  }
}
