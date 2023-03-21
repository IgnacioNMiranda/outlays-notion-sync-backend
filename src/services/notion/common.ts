import { CreateOutlayDTO } from '@interfaces/dtos/create-outlay-dto'
import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints'
import { environment } from '../../environment'
import { notionClient } from './client'

export const createOutlay = async (data: CreateOutlayDTO): Promise<{ data: CreatePageResponse; error: string }> => {
  try {
    const date = new Date(data.date)
    const year = date.getFullYear()
    const monthName = date.toLocaleString('en-US', { month: 'long' })

    let cardPaymentName: string
    if (data.paymentMethod.includes('Credit')) {
      // Format: {Type} Credit {Something else}
      const creditType = data.paymentMethod.split('Credit')[0].trim()
      cardPaymentName = `${monthName} ${year} ${creditType}`
    }

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
          database_id: '',
          synced_property_name: `${year}`,
          synced_property_id: '',
        },
        ...(cardPaymentName && {
          [environment.notion.cardPaymentsPropertykey]: {
            database_id: '',
            synced_property_name: '',
            synced_property_id: '',
          },
        }),
      },
    })
    return { data: outlay, error: '' }
  } catch (error) {
    return { data: null, error }
  }
}
