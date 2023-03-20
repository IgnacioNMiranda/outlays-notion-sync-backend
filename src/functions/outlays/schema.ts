import { JSONSchema7 } from "json-schema-to-ts";

const schema: JSONSchema7 =  {
  type: "object",
  properties: {
    name: { type: 'string' },
    paymentMethod: { type: 'array', minItems: 1, items: { type: 'string'} }
  },
  required: ['name', 'paymentMethod']
} as const;
export default schema as any
