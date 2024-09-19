export interface CoinPrice {
    symbol: string;
    price: number;
}

export interface InvestedCoin {
    id: string;
    symbol: string;
    time: Date;
    boughtAtPrice: number;
    amount: number;
    priceChange: number | undefined;
}