import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFromMultiplecharComponent } from './select-from-multiplechar.component';

describe('SelectFromMultiplecharComponent', () => {
  let component: SelectFromMultiplecharComponent;
  let fixture: ComponentFixture<SelectFromMultiplecharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFromMultiplecharComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectFromMultiplecharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
