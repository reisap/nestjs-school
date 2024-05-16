export default class ResponseDto {
  data: object;
  message: string;
  code: number;
  constructor({ data, message, code }) {
    this.message = message;
    this.code = code;
    this.data = data;
  }
  response() {
    const result = {
      code: this.code,
      message: this.message,
      data: this.data,
      timestamp: new Date(),
    };

    return result;
  }
}
