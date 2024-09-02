export interface CoinPrice {
    symbol: string;
    price: number;
}

export interface InvestedCoin {
    id: string;
    symbol: string;
    boughtAtPrice: number;
    amount: number;
}