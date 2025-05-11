import { Client } from '@notionhq/client'
import { environment } from '../../environment'

export const notionClient = new Client({ auth: environment.notion.accessToken })
