import { environment } from '../../environment'
import { notionClient } from './client'
import { createCardPaymentPage } from './create-card-payment-page'
import { createYearPage } from './create-year-page'

export const getYearPageId = async (year: string) => {
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

  return yearPageId
}

export const getCardPaymentPageId = async (paymentMethod: string, monthName: string, year: string) => {
  let cardPaymentPageId: string
  if (paymentMethod.includes('Credit')) {
    // Format: {Type} Credit {Something else}
    const creditType = paymentMethod.split('Credit')[0].trim()
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
      const newCardPaymentPage = await createCardPaymentPage(cardPaymentName, environment.notion.cardPaymentsDatabaseId)
      console.info(`'${cardPaymentName}' Card Payment Page created`)
      cardPaymentPageId = newCardPaymentPage.id
    } else cardPaymentPageId = cardPaymentPage.id
  }
  return cardPaymentPageId
}
