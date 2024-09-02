import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinPriceBoardComponent } from './coin-price-board.component';

describe('CoinPriceBoardComponent', () => {
  let component: CoinPriceBoardComponent;
  let fixture: ComponentFixture<CoinPriceBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinPriceBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinPriceBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
