export const environment = {
  notion: {
    accessToken: process.env.NOTION_ACCESS_TOKEN,

    outlaysDatabaseId: process.env.NOTION_OUTLAYS_DATABASE_ID,
    namePropertyKey: process.env.NOTION_NAME_PROPERTY_KEY,
    datePropertyKey: process.env.NOTION_DATE_PROPERTY_KEY,
    tagsPropertyKey: process.env.NOTION_TAGS_PROPERTY_KEY,
    pricePropertyKey: process.env.NOTION_PRICE_PROPERTY_KEY,
    paymentMethodPropertyKey: process.env.NOTION_PAYMENT_METHOD_PROPERTY_KEY,
    purchaseYearPropertykey: process.env.NOTION_PURCHASE_YEAR_PROPERTY_KEY,
    cardPaymentsPropertykey: process.env.NOTION_CARD_PAYMENTS_PROPERTY_KEY,

    yearsDatabaseId: process.env.NOTION_YEARS_DATABASE_ID,
    yearsNamePropertyKey: process.env.NOTION_YEARS_NAME_PROPERTY_KEY,

    cardPaymentsDatabaseId: process.env.NOTION_CARD_PAYMENTS_DATABASE_ID,
    cardPaymentsNamePropertyKey: process.env.NOTION_CARD_PAYMENTS_NAME_PROPERTY_KEY,
  },
  authToken: process.env.AUTH_TOKEN,
}
