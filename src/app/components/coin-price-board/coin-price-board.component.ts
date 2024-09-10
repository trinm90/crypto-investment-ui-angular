import { Component } from '@angular/core';
import { CoinPrice } from '../../models/coin.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.interface';


@Component({
  selector: 'app-coin-price-board',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './coin-price-board.component.html',
  styleUrl: './coin-price-board.component.scss'
})
export class CoinPriceBoardComponent {

  coinPrices: CoinPrice[] = [
    { symbol: 'BTCUSDT Moon', price: 99999 },
  ];

  user: User = {
    id: crypto.randomUUID(),
    fund: 999999,
    investedCoins: [{
      id: crypto.randomUUID(),
      symbol: 'BTCUSDT',
      boughtAtPrice: 99999,
      amount: 9,
      time: new Date(),
    }]
  }

  message: string = 'Welcome to T Crypto Exchange, your fund: ';

  transactionAmount: number = 999999;

  private updateTimeInMs: number = 999;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.updateLoop();
  }

  sellCoins(symbol: string, amount: number = 9) {
    const indexCoinPrice: number = this.coinPrices.findIndex(x => x.symbol === symbol);
    const coin: CoinPrice = this.coinPrices[indexCoinPrice];
    const receiving: number = amount * coin.price;
    this.user.fund += receiving;

    const indexInvestedCoin: number = this.user.investedCoins.findIndex(x => x.symbol === symbol);

    if (indexInvestedCoin !== -1) {
      this.user.investedCoins.splice(indexInvestedCoin, 1);
    }

    this.transactionAmount = receiving;
    this.message = 'Successful sell: ';
  }

  buyCoins(symbol: string, amount: number = 9) {
    const indexCoinPrice: number = this.coinPrices.findIndex(x => x.symbol == symbol);
    const coin: CoinPrice = this.coinPrices[indexCoinPrice];

    const cost: number = amount * coin.price;
    
    if (cost <= this.user.fund) {
      this.user.fund -= cost;

      this.user.investedCoins.push({
        id: crypto.randomUUID(),
        symbol: coin.symbol,
        boughtAtPrice: coin.price,
        amount: amount,
        time: new Date(),
      });

      this.transactionAmount = cost;
      this.message = 'Successful buy: ';
    }
    else {
      this.message = 'Not enough fund to buy: ';
    }

  }

  private async updateLoop() {
    while (true) {
      this.getCoinPriceFromBinance();
      await this.delay(this.updateTimeInMs);
    }
  }

  private getCoinPriceFromBinance(): void {
    const binancePriceAPI = 'https://api.binance.com/api/v3/ticker/price';

    const BTCSymbol: string = 'BTCUSDT';
    const ETHSymbol: string = 'ETHUSDT';
    const BNBSymbol: string = 'BNBUSDT';
    const BGBSymbol: string = 'BGBUSDT';

    this.http.get(binancePriceAPI)
      .subscribe({
        next: (coinPricesResponse: any) => {
          for (let priceResponse in coinPricesResponse) {
            const symbol: string = coinPricesResponse[priceResponse].symbol;
            const price: number = coinPricesResponse[priceResponse].price;

            if (symbol === BTCSymbol
              || symbol === ETHSymbol
              || symbol === BNBSymbol
              || symbol === BGBSymbol
            ) {
              const coinIndex: number = this.coinPrices.findIndex(x => x.symbol === symbol);

              if (coinIndex !== -1) {
                this.coinPrices.splice(coinIndex, 1);
              }

              this.coinPrices.push({
                symbol: symbol,
                price: price,
              });
            }

          }
        }, error: (error) => {
        }
      })
  }

  private calculatePriceChange() {

  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
