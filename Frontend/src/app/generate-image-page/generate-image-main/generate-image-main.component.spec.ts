import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateImageMainComponent } from './generate-image-main.component';

describe('GenerateImageMainComponent', () => {
  let component: GenerateImageMainComponent;
  let fixture: ComponentFixture<GenerateImageMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateImageMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateImageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
