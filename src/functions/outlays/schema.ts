import type { JSONSchema } from 'json-schema-to-ts'

const schema: JSONSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    date: { type: 'string', format: 'date' },
    tags: { type: 'array', minItems: 1, items: { type: 'string' } },
    price: { type: 'number' },
    type: { type: 'string' },
    paymentMethod: { type: 'string', minLength: 1 },
    installments: { type: 'number', default: 1 },
  },
  required: ['name', 'date', 'tags', 'price', 'type'],
} as const
export default schema as string
