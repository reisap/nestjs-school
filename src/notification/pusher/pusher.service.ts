//https://dashboard.pusher.com/
import Config from '../../../libs/common/src/config/config.json';
import Pusher from 'pusher';

export class PusherService {
  appId: string;
  key: string;
  secret: string;
  cluster: string;
  useTLS: boolean;
  pusher: any;
  constructor() {
    this.appId = Config.pusher.app_id;
    this.cluster = Config.pusher.cluster;
    this.secret = Config.pusher.secret;
    this.key = Config.pusher.key;
    this.useTLS = false;
    this.pusher = new Pusher({
      appId: this.appId,
      key: this.key,
      secret: this.secret,
      cluster: this.cluster,
      useTLS: this.useTLS,
    });
  }

  async send(channel: string, event: string, message: string | object) {
    return await this.pusher.trigger(channel, event, {
      message: message,
    });
  }

  async webhook() {}
}
