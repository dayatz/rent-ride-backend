import { FormattedError } from 'core/types'
import { z, ZodType } from 'zod'

export default function ValidateInput<T>(schema: ZodType<T>) {
  return function(
    target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ) {
    const originalMethod = descriptor.value
    if (originalMethod) {
      descriptor.value = async function (...args) {
        if (!args.length) return descriptor.value

        const dataToValidate = args[0]
        const result = schema.safeParse(dataToValidate)
        if (!result.success) {
          const err: FormattedError = {
            type: "ValidationError",
            message: "Input validation failed.",
            fieldErrors: result.error.errors.map(e => ({
              field: e.path[0] as string,
              message: e.message,
              type: e.code
            }))
          }
          throw err
        }
        return originalMethod.apply(this, args)
      }
    }
    return descriptor
  }
}