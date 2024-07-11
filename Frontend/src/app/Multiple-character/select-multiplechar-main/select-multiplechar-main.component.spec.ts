import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultiplecharMainComponent } from './select-multiplechar-main.component';

describe('SelectMultiplecharMainComponent', () => {
  let component: SelectMultiplecharMainComponent;
  let fixture: ComponentFixture<SelectMultiplecharMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMultiplecharMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectMultiplecharMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
