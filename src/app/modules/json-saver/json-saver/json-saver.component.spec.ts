import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonSaverComponent } from './json-saver.component';

describe('JsonSaverComponent', () => {
  let component: JsonSaverComponent;
  let fixture: ComponentFixture<JsonSaverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonSaverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
