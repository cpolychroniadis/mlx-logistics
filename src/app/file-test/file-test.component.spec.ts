import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTestComponent } from './file-test.component';

describe('FileTestComponent', () => {
  let component: FileTestComponent;
  let fixture: ComponentFixture<FileTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
