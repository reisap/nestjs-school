export default class ResponseDto {
  data?: object | string;
  message?: string;
  code: number;
  timestamp: string;
  constructor({ data }) {
    this.code = 200;
    this.message = 'Success';
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
