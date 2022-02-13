import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import {BasicTranslatePickerComponent} from './basic-translate-picker.component';

describe('BasicTranslatePickerComponent', () => {
  let component: BasicTranslatePickerComponent;
  let fixture: ComponentFixture<BasicTranslatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicTranslatePickerComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTranslatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
