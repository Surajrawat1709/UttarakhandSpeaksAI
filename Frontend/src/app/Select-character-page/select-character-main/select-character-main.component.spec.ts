import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCharacterMainComponent } from './select-character-main.component';

describe('SelectCharacterMainComponent', () => {
  let component: SelectCharacterMainComponent;
  let fixture: ComponentFixture<SelectCharacterMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCharacterMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectCharacterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
