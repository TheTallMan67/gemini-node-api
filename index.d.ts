import * as Promise from "bluebird";
import { EventEmitter } from "events";

declare module "gemini-node-api" {
  export type callback<T> = (error: any, data: T) => void;

  export type JSONObject = {
    [key: string]: any;
  };

  export type GetOptions = {
    uri: string;
  } & JSONObject;

  export type PostOptions = {
    request: string;
  } & JSONObject;

  export type RequestOptions = {
    method: "GET" | "POST";
    headers?: JSONObject;
  } & GetOptions;

  export type SymbolFilter = {
    symbol?: string;
  };

  export type BookFilter = {
    limit_bids?: number;
    limit_asks?: number;
  } & SymbolFilter;

  export type TradeHistoryFilter = {
    since?: number;
    limit_trades?: number;
    include_breaks?: boolean;
  } & SymbolFilter;

  export type AuctionHistoryFilter = {
    since?: number;
    limit_auction_results?: number;
    include_indicative?: boolean;
  } & SymbolFilter;

  export type BasicOrderOptions = {
    client_order_id?: string;
    symbol?: string;
    amount: number;
    min_amount?: number;
    price: number;
    moc?: boolean;
    ioc?: boolean;
    fok?: boolean;
    ao?: boolean;
    ioi?: boolean;
  };

  export type OrderOptions = {
    side: "buy" | "sell";
  } & BasicOrderOptions;

  export type OrderID = {
    order_id: number;
  };

  export type PastTradesFilter = {
    limit_trades?: number;
    timestamp?: number;
  } & SymbolFilter;

  export type ClearingOrderOptions = {
    symbol?: string;
    amount: number;
    price: number;
    side: "buy" | "sell";
    expires_in_hrs: number;
    counterparty_id?: string;
  };

  export type ClearingOrderID = {
    clearing_id: string;
  };

  export type ConfirmClearingOptions = {
    clearing_id: string;
    symbol?: string;
    amount: number;
    price: number;
    side: "buy" | "sell";
  };

  export type TransferFilter = {
    timestamp?: number;
    limit_transfers?: number;
  };

  export type NewAddressFilter = {
    currency: string;
    label?: string;
    legacy?: boolean;
  };

  export type WithdrawCryptoFilter = {
    currency: string;
    address: string;
    amount: number;
  };

  export type WithdrawGUSDFilter = {
    address: string;
    amount: number;
  };

  export type WSMarketOptions = {
    symbol?: string;
    heartbeat?: boolean;
    top_of_book?: boolean;
    bids?: boolean;
    offers?: boolean;
    trades?: boolean;
    auctions?: boolean;
  };

  export type WSOrderOptions = {
    symbolFilter?: string | string[];
    apiSessionFilter?: string | string[];
    eventTypeFilter?: string | string[];
  };

  export type Subscription = {
    name: string;
    symbols?: string[];
  };

  export type Auth = {
    key: string;
    secret: string;
  };

  export type RequestResponse =
    | JSONObject
    | JSONObject[]
    | JSONObject[][]
    | string[]
    | number[][];

  export type BookEntry = {
    price: string;
    amount: string;
    timestamp: string;
  };

  export type OrderBook = {
    bids: BookEntry[];
    asks: BookEntry[];
  };

  export type Trade = {
    timestamp: number;
    timestampms: number;
    tid: number;
    price: string;
    amount: string;
    exchange: "gemini";
    type: "buy" | "sell" | "auction" | "block";
    broken?: boolean;
  };

  export type AuctionInfo = {
    closed_until_ms?: number;
    last_auction_eid?: number;
    last_auction_price?: string;
    last_auction_quantity?: string;
    last_highest_bid_price?: string;
    last_lowest_ask_price?: string;
    last_collar_price?: string;
    most_recent_indicative_price?: string;
    most_recent_indicative_quantity?: string;
    most_recent_highest_bid_price?: string;
    most_recent_lowest_ask_price?: string;
    most_recent_collar_price?: string;
    next_update_ms?: number;
    next_auction_ms?: number;
  };

  export type AuctionHistory = {
    timestamp: number;
    timestampms: number;
    auction_id: number;
    eid: number;
    event_type: "indicative" | "auction";
    auction_result: "success" | "failure";
    auction_price?: string;
    auction_quantity?: string;
    highest_bid_price?: string;
    lowest_ask_price?: string;
    collar_price?: string;
    unmatched_collar_quantity?: string;
  };

  export type NotionalOneDay = {
    date: string;
    notional_volume: number;
  };

  export type OrderStatus = {
    order_id: string;
    client_order_id?: string;
    symbol: string;
    exchange: "gemini";
    price?: string;
    avg_execution_price: string;
    side: "buy" | "sell";
    type:
      | "exchange limit"
      | "auction-only exchange limit"
      | "market buy"
      | "market sell"
      | "indication-of-interest";
    options: string[];
    timestamp: string;
    timestampms: number;
    is_live: boolean;
    is_cancelled: boolean;
    is_hidden: boolean;
    reason?: string;
    was_forced: boolean;
    executed_amount: string;
    remaining_amount: string;
    original_amount?: string;
  };

  export type CancelOrdersResponse = {
    result: "ok";
    details: {
      cancelledOrders: number[];
      cancelRejects: number[];
    };
  };

  export type PastTrade = {
    price: string;
    amount: string;
    timestamp: number;
    timestampms: number;
    type: "Buy" | "Sell";
    aggressor: boolean;
    fee_currency: string;
    fee_amount: string;
    tid: number;
    order_id: string;
    client_order_id?: string;
    exchange?: "gemini";
    is_auction_fill: boolean;
    break?: string;
  };

  export type NotionalVolume = {
    account_id?: number;
    date: string;
    last_updated_ms: number;
    web_maker_fee_bps: number;
    web_taker_fee_bps: number;
    web_auction_fee_bps: number;
    api_maker_fee_bps: number;
    api_taker_fee_bps: number;
    api_auction_fee_bps: number;
    fix_maker_fee_bps: number;
    fix_taker_fee_bps: number;
    fix_auction_fee_bps: number;
    block_maker_fee_bps: number;
    block_taker_fee_bps: number;
    notional_30d_volume: number;
    notional_1d_volume: NotionalOneDay[];
  };

  export type TradeVolume = {
    account_id: number;
    symbol: string;
    base_currency: string;
    notional_currency: string;
    data_date: string;
    total_volume_base: number;
    maker_buy_sell_ratio: number;
    buy_maker_base: number;
    buy_maker_notional: number;
    buy_maker_count: number;
    sell_maker_base: number;
    sell_maker_notional: number;
    sell_maker_count: number;
    buy_taker_base: number;
    buy_taker_notional: number;
    buy_taker_count: number;
    sell_taker_base: number;
    sell_taker_notional: number;
    sell_taker_count: number;
  };

  export type NewClearingOrderResponse = {
    result: string;
    clearing_id: string;
  };

  export type ClearingOrderStatus = {
    result: "ok";
    status:
      | "AwaitConfirm"
      | "Confirmed"
      | "AttemptSettlement"
      | "Settled"
      | "Expired"
      | "Canceled"
      | "Not Found";
  };

  export type CancelClearingOrderResponse = {
    result: "ok";
    details: string;
  };

  export type ConfirmClearingOptionsResponse = {
    result: "confirmed";
  };

  export type Balance = {
    type: "exchage";
    currency: string;
    amount: string;
    available: string;
    availableForWithdrawal: string;
  };

  export type Transfer = {
    type: "Deposit" | "Withdrawal";
    status: "Advanced" | "Complete";
    timestampms: number;
    eid: number;
    currency: string;
    amount: string;
    method?: "ACH" | "Wire";
    txHash?: string;
    outputIdx?: number;
    destination?: string;
    purpose?: string;
  };

  export type NewAddress = {
    currency: string;
    address: string;
    label?: string;
  };

  export type Withdrawal = {
    address: string;
    amount: string;
    txHash?: string;
    withdrawalID?: string;
    message?: string;
  };

  export type GUSDWithdrawal = {
    destination: string;
    amount: string;
    txHash: string;
  };

  export type Heartbeat = { result: "ok" };

  export type AuthHeaders = {
    "X-GEMINI-PAYLOAD": string;
    "X-GEMINI-SIGNATURE": string;
    "X-GEMINI-APIKEY": string;
  };

  export type PublicClientOptions = {
    symbol?: string;
    sandbox?: boolean;
    api_uri?: string;
    timeout?: number;
  };

  export type AuthenticatedClientOptions = Auth & PublicClientOptions;

  export type WebsocketClientOptions = {
    symbol?: string;
    sandbox?: boolean;
    api_uri?: string;
    key?: string;
    secret?: string;
  };

  export class PublicClient {
    get(options: GetOptions): Promise<RequestResponse>;

    request(options: RequestOptions): Promise<RequestResponse>;

    getOrderBook(options?: BookFilter): Promise<OrderBook>;

    getTradeHistory(options?: TradeHistoryFilter): Promise<Trade[]>;

    getCurrentAuction(options?: SymbolFilter): Promise<AuctionInfo>;

    getAuctionHistory(
      options?: AuctionHistoryFilter
    ): Promise<AuctionHistory[]>;
  }

  export class AuthenticatedClient extends PublicClient {
    constructor(options: AuthenticatedClientOptions);

    post(options: PostOptions): Promise<RequestResponse>;

    newOrder(options: OrderOptions): Promise<OrderStatus>;

    buy(options: BasicOrderOptions): Promise<OrderStatus>;

    sell(options: BasicOrderOptions): Promise<OrderStatus>;

    cancelOrder(options: OrderID): Promise<OrderStatus>;

    cancelSession(): Promise<CancelOrdersResponse>;

    cancelAll(): Promise<CancelOrdersResponse>;

    getOrderStatus(options: OrderID): Promise<OrderStatus>;

    getActiveOrders(): Promise<OrderStatus[]>;

    getPastTrades(options?: PastTradesFilter): Promise<PastTrade[]>;

    getNotionalVolume(): Promise<NotionalVolume>;

    getTradeVolume(): Promise<TradeVolume[][]>;

    newClearingOrder(
      options: ClearingOrderOptions
    ): Promise<NewClearingOrderResponse>;

    getClearingOrderStatus(
      options: ClearingOrderID
    ): Promise<ClearingOrderStatus>;

    cancelClearingOrder(
      options: ClearingOrderID
    ): Promise<CancelClearingOrderResponse>;

    confirmClearingOrder(
      options: ConfirmClearingOptions
    ): Promise<ConfirmClearingOptionsResponse>;

    getAvailableBalances(): Promise<Balance[]>;

    getTransfers(options?: TransferFilter): Promise<Transfer[]>;

    getNewAddress(options: NewAddressFilter): Promise<NewAddress>;

    withdrawCrypto(options: WithdrawCryptoFilter): Promise<Withdrawal>;

    withdrawGUSD(options: WithdrawGUSDFilter): Promise<GUSDWithdrawal>;

    heartbeat(): Promise<Heartbeat>;
  }

  export class WebsocketClient extends EventEmitter {
    constructor(options?: WebsocketClientOptions);

    connectMarket(options?: WSMarketOptions): void;

    connect(): void;

    connectOrders(options?: WSOrderOptions): void;

    disconnectMarket(options?: SymbolFilter): void;

    disconnect(): void;

    disconnectOrders(): void;

    subscribe(options: Subscription | Subscription[]): void;

    unsubscribe(options: Subscription | Subscription[]): void;

    on(event: "message", listener: (data: any, market: string) => void): this;
    on(event: "error", listener: (error: any, market: string) => void): this;
    on(event: "open", listener: (market: string) => void): this;
    on(event: "close", listener: (market: string) => void): this;
  }

  export function SignRequest(auth: Auth, payload?: JSONObject): AuthHeaders;
}
