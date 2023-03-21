import { JSONSchema7 } from 'json-schema-to-ts'

const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    date: { type: 'string', format: 'date' },
    tags: { type: 'array', minItems: 1, items: { type: 'string' } },
    price: { type: 'number' },
    paymentMethod: { type: 'string' },
  },
  required: ['name', 'date', 'tags', 'price', 'paymentMethod'],
} as const
export default schema as any
