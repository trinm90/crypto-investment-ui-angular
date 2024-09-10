import { Routes } from '@angular/router';
import { CoinPriceBoardComponent } from './components/coin-price-board/coin-price-board.component';
import { CryptoIndexComponent } from './components/crypto-index/crypto-index.component';

export const routes: Routes = [
    { path: '', redirectTo: '/coin-price-board', pathMatch: 'full' },
    { path: 'coin-price-board', component: CoinPriceBoardComponent, pathMatch: 'full' },
    { path: 'crypto-index', component: CryptoIndexComponent, pathMatch: 'full' },
];
