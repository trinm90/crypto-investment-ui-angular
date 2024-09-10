import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoIndexComponent } from './crypto-index.component';

describe('CryptoIndexComponent', () => {
  let component: CryptoIndexComponent;
  let fixture: ComponentFixture<CryptoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
