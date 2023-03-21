import { CreateOutlayDTO } from '@interfaces/dtos/create-outlay-dto'
import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints'
import { environment } from '../../environment'
import { notionClient } from './client'

export const createOutlay = async (data: CreateOutlayDTO): Promise<{ data: CreatePageResponse; error: string }> => {
  try {
    const date = new Date(data.date)
    const year = date.getFullYear()
    const monthName = date.toLocaleString('en-US', { month: 'long' })

    let cardPaymentId: string
    if (data.paymentMethod.includes('Credit')) {
      // Format: {Type} Credit {Something else}
      const creditType = data.paymentMethod.split('Credit')[0].trim()
      const cardPaymentName = `${monthName} ${year} ${creditType}`
      const cardPaymentRelationship = await notionClient.databases.query({
        database_id: environment.notion.cardPaymentsDatabaseId,
      })
      const cardPaymentRecord = cardPaymentRelationship.results.find(
        (result) =>
          'properties' in result &&
          result.properties[environment.notion.cardPaymentsNamePropertyKey].title[0].text.content === cardPaymentName,
      )
      if (!cardPaymentRecord) return { data: null, error: 'Card Payment not found' }
      cardPaymentId = cardPaymentRecord.id
    }

    const yearRelationship = await notionClient.databases.query({ database_id: environment.notion.yearsDatabaseId })
    const yearRecord = yearRelationship.results.find(
      (result) =>
        'properties' in result &&
        result.properties[environment.notion.yearsNamePropertyKey].title[0].text.content === `${year}`,
    )
    if (!yearRecord) return { data: null, error: 'Year not found' }

    const outlay = await notionClient.pages.create({
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
          relation: [{ id: yearRecord.id }],
        },
        ...(cardPaymentId && {
          [environment.notion.cardPaymentsPropertykey]: {
            relation: [{ id: cardPaymentId }],
          },
        }),
      },
    })
    return { data: outlay, error: '' }
  } catch (error) {
    return { data: null, error }
  }
}
