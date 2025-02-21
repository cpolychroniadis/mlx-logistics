import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResponsiveComponent } from './home-responsive.component';

describe('HomeResponsiveComponent', () => {
  let component: HomeResponsiveComponent;
  let fixture: ComponentFixture<HomeResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeResponsiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
