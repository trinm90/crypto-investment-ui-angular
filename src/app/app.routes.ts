import { Routes } from '@angular/router';
import { CoinPriceBoardComponent } from './components/coin-price-board/coin-price-board.component';

export const routes: Routes = [
    { path: '', redirectTo: '/coin-price-board', pathMatch: 'full' },
    { path: 'coin-price-board', component: CoinPriceBoardComponent, pathMatch: 'full' },
];
