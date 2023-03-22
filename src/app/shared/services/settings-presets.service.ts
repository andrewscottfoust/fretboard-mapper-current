import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsPresetsService {

  constructor(private http: HttpClient) { }

  GetSettingsPresets(): Observable<any> {
    // return this.http.get<any>('http://www.andrewfoust.com/development/projects/fretboard-mapper/assets/data/settings-presets.json');
    return this.http.get<any>('/assets/data/settings-presets.json');
  }
}
