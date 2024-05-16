export default class ResponseDto {
  data: object;
  message: string;
  code: number;
  timestamp: string;
  constructor({ data, message, code }) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }
  response() {
    const result = {
      code: this.code,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp,
    };

    return result;
  }
}
