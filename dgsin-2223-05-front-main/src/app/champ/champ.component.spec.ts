import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampComponent } from './champ.component';

describe('ChampComponent', () => {
  let component: ChampComponent;
  let fixture: ComponentFixture<ChampComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChampComponent]
    });
    fixture = TestBed.createComponent(ChampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
