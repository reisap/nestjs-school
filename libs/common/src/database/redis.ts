import { Injectable } from '@nestjs/common';
import { createClient } from '@redis/client';

@Injectable()
export default class RedisClient {
  public client: any;
  constructor() {
    this.client = createClient({ url: 'redis://redis-db:6379' });
    this.client.connect();
  }
  run() {
    return this;
  }
  async setKey({ key, data }) {
    await this.client.set(key, data);
  }
  async getKey(key) {
    const myKeyValue = await this.client.get(key);
    console.log(myKeyValue);
    return myKeyValue;
  }
  async sample() {
    await this.client.set('mykey', 'Hello from node redis');
  }

  async getSample() {
    const myKeyValue = await this.client.get('mykey');
    console.log(myKeyValue);
  }
}
