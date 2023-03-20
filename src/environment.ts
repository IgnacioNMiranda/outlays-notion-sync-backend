export const environment = {
  notion: {
    accessToken: process.env.NOTION_ACCESS_TOKEN,
    databaseId: process.env.NOTION_DATABASE_ID,
    namePropertyKey: process.env.NOTION_NAME_PROPERTY_KEY,
    datePropertyKey: process.env.NOTION_DATE_PROPERTY_KEY,
    tagsPropertyKey: process.env.NOTION_TAGS_PROPERTY_KEY,
    pricePropertyKey: process.env.NOTION_PRICE_PROPERTY_KEY,
    paymentMethodPropertyKey: process.env.NOTION_PAYMENT_METHOD_PROPERTY_KEY,
  },
}
