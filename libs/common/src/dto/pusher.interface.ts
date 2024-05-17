export enum typePusher {
  verification = 'send-verification',
  newPost = 'new-post',
}

export interface ParamsPusher {
  type: typePusher; //type sendverification | new post | etc
  channel: string;
  event: string;
  message: string | object;
}
