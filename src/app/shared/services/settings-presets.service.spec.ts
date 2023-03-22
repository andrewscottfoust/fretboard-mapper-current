import { TestBed } from '@angular/core/testing';

import { SettingsPresetsService } from './settings-presets.service';

describe('SettingsPresetsService', () => {
  let service: SettingsPresetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsPresetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
