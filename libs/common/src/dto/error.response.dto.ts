export default class ErrorResponseDto {
  message: string;
  code: number;
  error: boolean;
  constructor({ message, code }) {
    this.message = message || 'oops, somenthings got error';
    this.code = code || 401;
    this.error = true;
  }

  response() {
    const result = {
      code: this.code,
      message: this.message,
      error: this.error,
      timestamp: new Date(),
    };

    return result;
  }
}
