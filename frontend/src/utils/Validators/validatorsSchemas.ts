import { valid } from './validators'

export const validSchemas = {
  name: {
    pattern: valid.namesPattern,
    minLength: valid.minLength(2),
    maxLength: valid.maxLength(50)
  }
}
