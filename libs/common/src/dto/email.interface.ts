export enum typeEmail {
  verification = 'sendVerification',
  newPost = 'new-post',
}

export interface ParamsEmail {
  type: typeEmail; //type sendverification | new post | etc
  email: string;
  token?: string;
}
