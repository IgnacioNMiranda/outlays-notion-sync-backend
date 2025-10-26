export const environment = {
  notion: {
    accessToken: process.env.NOTION_ACCESS_TOKEN,

    outlaysDatabaseId: process.env.NOTION_OUTLAYS_DATABASE_ID,

    creditChargeDay: Number.parseInt(process.env.NOTION_CREDIT_CHARGE_DAY, 10),

    yearsDatabaseId: process.env.NOTION_YEARS_DATABASE_ID,

    cardPaymentsDatabaseId: process.env.NOTION_CARD_PAYMENTS_DATABASE_ID,
  },
  authToken: process.env.AUTH_TOKEN,
  isOffline: process.env.IS_OFFLINE,
}
