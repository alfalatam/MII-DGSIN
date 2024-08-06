import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampChartComponent } from './champ-chart.component';

describe('ChampChartComponent', () => {
  let component: ChampChartComponent;
  let fixture: ComponentFixture<ChampChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChampChartComponent]
    });
    fixture = TestBed.createComponent(ChampChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
