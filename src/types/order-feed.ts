export enum WebSocketStatus {
  CONNECTING = "CONNECTING",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export type TOrderFeed = {
  _id: string;
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  ingredients: Array<string>;
}

export type TOrdersFeed = {
  orders: Array<TOrderFeed>;
  total: string;
  totalToday: string;
}
