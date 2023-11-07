export enum WebSocketStatus {
  CONNECTING = "CONNECTING",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export enum OrderFeedType {
  DATA = "data",
}

export enum StatusOrderFeed {
  DONE = "done",
}

export type TOrderFeed = {
  _id: string;
  name: string;
  status: StatusOrderFeed;
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

export type TData = {
  type: OrderFeedType.DATA;
  data: TOrderFeed;
}

export type TOrderFeedAction = TData;

export type TOrderFeedActions = TOrderFeedAction;
