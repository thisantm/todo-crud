export class InvalidAuthorizationHeaderError extends Error {
  constructor(message: string) {
    super('Invalid Authorization header')
    this.name = 'InvalidAuthorizationHeaderError'
    this.message = message
  }
}

export class InvalidTokenError extends Error {
  constructor(message: string) {
    super('Invalid token')
    this.name = 'InvalidTokenError'
    this.message = message
  }
}
