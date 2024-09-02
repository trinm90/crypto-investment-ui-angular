import { InvestedCoin } from "./coin.interface";

export interface User {
    id: string;
    fund: number;
    investedCoins: InvestedCoin[];
}