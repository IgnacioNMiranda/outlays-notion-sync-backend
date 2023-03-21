import { CreateOutlayPageDTO } from '@interfaces/dtos/create-outlay-dto'
import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints'
import { environment } from '../../environment'
import { notionClient } from './client'
import { createCardPaymentPage } from './create-card-payment-page'
import { createYearPage } from './create-year-page'

export const createOutlayPage = async (
  data: CreateOutlayPageDTO,
): Promise<{ data: CreatePageResponse; error: string }> => {
  try {
    const date = new Date(data.date)
    const year = `${date.getFullYear()}`
    const monthName = date.toLocaleString('en-US', { month: 'long' })

    let cardPaymentPageId: string
    if (data.paymentMethod.includes('Credit')) {
      // Format: {Type} Credit {Something else}
      const creditType = data.paymentMethod.split('Credit')[0].trim()
      const cardPaymentName = `${monthName} ${year} ${creditType}`
      const cardPaymentPages = await notionClient.databases.query({
        database_id: environment.notion.cardPaymentsDatabaseId,
      })
      const cardPaymentPage = cardPaymentPages.results.find((result) => {
        if ('properties' in result) {
          const field = result.properties[environment.notion.cardPaymentsNamePropertyKey]
          if ('title' in field && 'text' in field.title[0]) {
            return field.title[0].text.content === cardPaymentName
          }
        }
      })
      if (!cardPaymentPage) {
        console.info(`Creating '${cardPaymentName}' Card Payment Page`)
        const newCardPaymentPage = await createCardPaymentPage(
          cardPaymentName,
          environment.notion.cardPaymentsDatabaseId,
        )
        console.info(`'${cardPaymentName}' Card Payment Page created`)
        cardPaymentPageId = newCardPaymentPage.id
      } else cardPaymentPageId = cardPaymentPage.id
    }

    let yearPageId: string
    const yearPages = await notionClient.databases.query({ database_id: environment.notion.yearsDatabaseId })
    const yearPage = yearPages.results.find((result) => {
      if ('properties' in result) {
        const field = result.properties[environment.notion.yearsNamePropertyKey]
        if ('title' in field && 'text' in field.title[0]) {
          return field.title[0].text.content === year
        }
      }
    })
    if (!yearPage) {
      console.info(`Creating '${year}' Year Page`)
      const newYearPage = await createYearPage(year, environment.notion.yearsDatabaseId)
      console.info(`'${year}' Year Page created`)
      yearPageId = newYearPage.id
    } else yearPageId = yearPage.id

    console.info(`Creating '${data.name}' Outlay`)
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
          relation: [{ id: yearPageId }],
        },
        ...(cardPaymentPageId && {
          [environment.notion.cardPaymentsPropertykey]: {
            relation: [{ id: cardPaymentPageId }],
          },
        }),
      },
    })
    console.info(`'${data.name}' Outlay created`)
    return { data: outlay, error: '' }
  } catch (error) {
    return { data: null, error }
  }
}
