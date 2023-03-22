import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScaleAndChordSettingsComponent } from './scale-and-chord-settings.component';

describe('ScaleAndChordSettingsComponent', () => {
  let component: ScaleAndChordSettingsComponent;
  let fixture: ComponentFixture<ScaleAndChordSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaleAndChordSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleAndChordSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
