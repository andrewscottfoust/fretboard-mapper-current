import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, OnInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { SettingsPresetsService } from '../../services/settings-presets.service';

@Component({
  selector: 'app-scale-and-chord-settings',
  templateUrl: './scale-and-chord-settings.component.html',
  styleUrls: ['./scale-and-chord-settings.component.scss']
})
export class ScaleAndChordSettingsComponent implements OnInit {

  @Input() settings;
  @Output() itemUpdated = new EventEmitter<any>();

  chords = [];
  form: FormGroup;
  formInit = false;
  mode = null;
  stringPresets = [];
  scaleNotes = [
    'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'
  ];
  scales = [];
  sectionFretboardOpen = false;
  sectionModeOpen = false;
  sectionPresetsOpen = false;
  sectionSelectedNotesOpen = false;
  sectionStringsOpen = false;
  specificChordPresets = [];

  selections = {
    fretBoardRange: {
      low: 0,
      high: 24
    },
    numFrets: 25,
    stringNames: [
      'E', 'B', 'G', 'D', 'A', 'E'
    ],
    fretMarkerNums: [3, 5, 7, 9, 12, 15, 17, 19, 21, 23],
    selectedNotes: [],
    selectedRootNote: 0,
    manuallySelectedNotes: []
  };
  strings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Subscriptions
  formChangesSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private settingsPresetsService: SettingsPresetsService) { }

  ngOnInit() {
    console.log(this.chords, this.stringPresets, this.scales);
    this.getSettingsPresets();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.settings = changes.settings ? changes.settings.currentValue : this.settings;
  }

  ngOnDestroy() {
    if (this.formChangesSub && !this.formChangesSub.closed) {
      this.formChangesSub.unsubscribe();
    }
  }

  getSettingsPresets() {
    this.settingsPresetsService.GetSettingsPresets().subscribe(response => {
      console.log(response);
      this.chords = response.chords;
      this.scales = response.scales;
      this.stringPresets = response.stringPresets;
      this.specificChordPresets = response.specificChordPresets;
      this.specificChordPresets.sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.initForm();
    });
  }

  handleFretboardChange() {
  }

  handleModeChange($event) {
    this.mode = $event.value;
    this.resetSelections();
    this.handleNotesSelection();
  }

  handleNotesSelection() {
    this.resetNoteFields();
    const rootValue = this.form.get('root').value;
    const scaleValue = this.mode === 'scale' ? this.form.get('scale').value : this.form.get('chord').value;
    if (rootValue !== null && scaleValue !== null) {
      const noteSource = this.mode === 'scale' ? this.scales : this.chords;
      const selectedScale = noteSource.find(item => item.name === scaleValue.name).notes;
      const rootStartIdx = this.scaleNotes.findIndex(item => item === rootValue);
      const shiftedArrayFront = this.scaleNotes.slice(rootStartIdx, this.scaleNotes.length);
      const shiftedArrayBack = this.scaleNotes.slice(0, rootStartIdx);
      const mergedArray = [...shiftedArrayFront, ...shiftedArrayBack];
      const shiftedSelectedScale = [];

      let i = 0;
      selectedScale.forEach(note => {
        shiftedSelectedScale.push(mergedArray[note]);
      });
      shiftedSelectedScale.forEach(note => {
        const idx = this.scaleNotes.findIndex(item => item === note);
        this.form.get('note' + idx).setValue(true);
      })
    }

  }

  handleStringPresetSelection($event) {
    const stringNames = $event.value.stringNames;
    this.resetStringFields();
    for (let i = 0; i < stringNames.length; i++) {
      this.form.get('string' + i).setValue(stringNames[i]);
    }
  }

  handleSpecificChordPreset($event) {
    this.selections.manuallySelectedNotes = $event.value.data;
    this.selections.selectedRootNote = $event.value.root;
    this.selections.selectedNotes = [];
    this.itemUpdated.emit(this.selections);
  }

  initForm() {

    const formGroup = {
      chord: null,
      fretRangeLow: 0,
      fretRangeHigh: 25,
      numFrets: 25,
      presets: this.stringPresets[0],
      specificChords: {
        name: '',
        root: 0,
        data: []
      },
      string0: 'E',
      string1: 'B',
      string2: 'G',
      string3: 'D',
      string4: 'A',
      string5: 'E',
      string6: null,
      string7: null,
      string8: null,
      string9: null,
      root: null,
      scale: null,
      note0: null,
      note1: null,
      note2: null,
      note3: null,
      note4: null,
      note5: null,
      note6: null,
      note7: null,
      note8: null,
      note9: null,
      note10: null,
      note11: null
    };

    this.form = this.fb.group(formGroup);

    this.formChangesSub = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(x => {
        this.updateScaleSelections();
      });
    this.formInit = true;
  }

  resetNoteFields() {
    for (let i = 0; i < this.scaleNotes.length; i++) {
      this.form.get('note' + i).setValue(null);
    }
  }

  resetStringFields() {
    for (let i = 0; i < this.strings.length; i++) {
      this.form.get('string' + i).setValue(null);
    }
  }

  resetForm() {
    this.form.reset();
  }

  resetSelections() {
    this.form.get('root').setValue(null);
    this.form.get('chord').setValue(null);
    this.form.get('presets').setValue(this.stringPresets[0]);
    this.form.get('specificChords').setValue({
      name: '',
      root: 0,
      data: []
    });
    this.selections.selectedRootNote = null;
    this.selections.selectedNotes = [];
    this.selections.manuallySelectedNotes = [];
  }

  updateScaleSelections() {
    const selectedStrings = [];
    const rootValue = this.scaleNotes.findIndex(item => item === this.form.get('root').value);
    const selectedNotes = [];
    let i = 0;

    this.strings.forEach(item => {
      const stringValue = this.form.get('string' + i).value;
      if (stringValue !== null) {
        selectedStrings.push(stringValue);
      }
      i++;
    });

    i = 0;
    this.scaleNotes.forEach(item => {
      if (this.form.get('note' + i).value === true) {
        selectedNotes.push(i);
      }
      i++;
    });

    this.selections = {
      fretBoardRange: {
        low: this.form.get('fretRangeLow').value,
        high: this.form.get('fretRangeHigh').value
      },
      numFrets: this.form.get('numFrets').value,
      stringNames: selectedStrings,
      fretMarkerNums: [3, 5, 7, 9, 12, 15, 17, 19, 21, 23],
      selectedNotes: selectedNotes,
      selectedRootNote: rootValue,
      manuallySelectedNotes: this.form.get('specificChords').value !== null ? this.form.get('specificChords').value.data : []
    };
    this.itemUpdated.emit(this.selections);
  }

}
