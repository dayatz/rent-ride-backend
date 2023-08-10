type ErrorBase = {
  message?: string;
};

type Details = {
  referencId: string;
};

type FieldError = {
  field: string;
  type: string;
  message: string;
};

type Errors =
  | { type: "ValidationError"; fieldErrors: FieldError[] }
  | { type: "AuthenticationError" }
  | { type: "AuthorizationError" }
  | { type: "InternalServerError"; details: Details };

export type FormattedError = ErrorBase & Errors;
