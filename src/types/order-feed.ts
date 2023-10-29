export enum WebSocketStatus {
  CONNECTING = "CONNECTING...",
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
  _id: number;
  status: StatusOrderFeed;
  number: number;
  createdAt: Date;
  updatedAt: Date;
  ingredients: Array<string>;
}

export type TOrdersFeed = Array<TOrderFeed>;

export type TData = {
  type: OrderFeedType.DATA;
  data: TOrderFeed;
}

export type TOrderFeedAction = TData;

export type TOrderFeedActions = TOrderFeedAction;
