import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuWhiteComponent } from './top-menu-white.component';

describe('TopMenuWhiteComponent', () => {
  let component: TopMenuWhiteComponent;
  let fixture: ComponentFixture<TopMenuWhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMenuWhiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMenuWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
