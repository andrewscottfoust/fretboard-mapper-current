import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ContainerMapperComponent } from './shared/components/container-mapper/container-mapper.component';
import { MainComponent } from './shared/components/main/main.component';
import { FretboardComponent } from './shared/components/fretboard/fretboard.component';
import { SamplePlayerComponent } from './shared/components/sample-player/sample-player.component';
import { ScaleAndChordSettingsComponent } from './shared/components/scale-and-chord-settings/scale-and-chord-settings.component';

import { SettingsPresetsService } from './shared/services/settings-presets.service';


@NgModule({
  declarations: [
    AppComponent,
    ContainerMapperComponent,
    FretboardComponent,
    MainComponent,
    ScaleAndChordSettingsComponent,
    SamplePlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MainComponent,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule
  ],
  providers: [
    SettingsPresetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
