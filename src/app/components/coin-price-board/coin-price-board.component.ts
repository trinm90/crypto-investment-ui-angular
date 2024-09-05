import { Component } from '@angular/core';
import { CoinPrice } from '../../models/coin.interface';
import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.interface';


@Component({
  selector: 'app-coin-price-board',
  standalone: true,
  imports: [CurrencyPipe],
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
    investedCoins: [{ id: crypto.randomUUID(), symbol: 'BTCUSDT', boughtAtPrice: 99999, amount: 9 }]
  }

  message: string = 'Welcome to T Crypto Exchange';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.updatePriceLoop();
  }

  async updatePriceLoop() {
    while (true) {
      this.getCoinPriceFromBinance();
      await this.delay(9999);

    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getCoinPriceFromBinance(): void {
    const binancePriceAPI = 'https://api.binance.com/api/v3/ticker/price';

    const BTCSymbol: string = 'BTCUSDT';
    const ETHSymbol: string = 'ETHUSDT';
    const BNBSymbol: string = 'BNBUSDT';
    const BGBSymbol: string = 'BGBUSDT';
    
    this.http.get(binancePriceAPI)
      .subscribe({
        next: (coinPricesResponse: any) => {          
          for (let price in coinPricesResponse) {
            if (coinPricesResponse[price].symbol === BTCSymbol
              || coinPricesResponse[price].symbol === ETHSymbol
              || coinPricesResponse[price].symbol === BNBSymbol
              || coinPricesResponse[price].symbol === BGBSymbol
            ) {
              const coinIndex: number = this.coinPrices.findIndex(x => x.symbol === coinPricesResponse[price].symbol);

              if (coinIndex !== -1) {
                this.coinPrices.splice(coinIndex, 1);
              }

              this.coinPrices.push({
                symbol: coinPricesResponse[price].symbol,
                price: coinPricesResponse[price].price,
              });
            }

          }
        }, error: (error) => {
        }
      })
  }

  sellCoins(symbol: string, amount: number) {
    const indexCoinPrice: number = this.coinPrices.findIndex(x => x.symbol === symbol);
    const coin: CoinPrice = this.coinPrices[indexCoinPrice];
    const receiving: number = amount * coin.price;
    this.user.fund += receiving;

    const indexInvestedCoin: number = this.user.investedCoins.findIndex(x => x.symbol === symbol);

    if (indexInvestedCoin !== -1) {
      this.user.investedCoins.splice(indexInvestedCoin, 1);
    }

    this.message = 'Successful sell: ' + receiving.toString();
  }

  buyCoins(symbol: string, amount: number) {
    const indexCoinPrice: number = this.coinPrices.findIndex(x => x.symbol == symbol);
    const coin: CoinPrice = this.coinPrices[indexCoinPrice];

    const cost: number = amount * coin.price;

    if (cost <= this.user.fund) {
      this.user.fund -= cost;

      this.user.investedCoins.push({
        id: crypto.randomUUID(), symbol: coin.symbol, boughtAtPrice: coin.price, amount: amount
      });
      this.message = 'Successful buy: ' + cost.toString();
    }
    else {
      this.message = 'Not enough fund: ' + cost.toString();
    }

  }

}
