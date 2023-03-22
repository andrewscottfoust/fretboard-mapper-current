import { Component, Input, Output, EventEmitter, OnChanges, OnInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { findIndex } from 'rxjs/operators';


@Component({
  selector: 'app-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.scss']
})
export class FretboardComponent implements OnInit, OnChanges {

  @Input() settings = {
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
  @Output() itemUpdated = new EventEmitter<any>();

  addChordVisible = false;
  chordData = [];
  chordName = null;
  chordSelections = [];
  fretMarkers = [];
  noteWidth = 3;
  rootName = null;
  scaleNotes = [
    'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'
  ];
  strings = null;

  constructor() { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.settings = changes.settings ? changes.settings.currentValue : this.settings;
    console.log('fretboard settings', this.settings);
    this.init();
  }

  addChord() {
    this.chordData.push({
      name: this.chordName,
      root: this.rootName,
      data: this.chordSelections
    });
    this.chordSelections = [];
    console.log(this.chordData);
  }

  handleNoteToggle(string, note, name) {
    this.strings[string][note].value === 0 ? this.strings[string][note].value = 1 : this.strings[string][note].value = 0;
    this.chordSelections.push({
      string: string,
      fretNumber: note
    });
    console.log(string, note);
  }

  init() {
    this.fretMarkers = [];
    this.noteWidth = 100 / this.settings.numFrets;
    this.initFretMarkers();
    this.initStringsArray();
    if (this.settings.manuallySelectedNotes.length > 0) {
      this.manualSelectNotes();
    }
  }

  initFretMarkers(): void {
    let i = 0;
    while (i < this.settings.numFrets - 1) {
      let isMarker = false;
      if (
        this.settings.fretMarkerNums.findIndex(item => item === i) > -1
      ) {
        isMarker = true;
      }
      this.fretMarkers.push(isMarker);
      i++;
    }
  }

  initStringsArray() {
    this.strings = [];
    let curFret = 0;
    let noteStartIdx = 0;
    this.settings.stringNames.forEach(string => {
      curFret = 0;
      const stringNotes = [];
      noteStartIdx = this.scaleNotes.findIndex(item => item === string);
      while (curFret < this.settings.numFrets) {
        const noteName = this.scaleNotes[noteStartIdx];
        const noteObj = {
          noteIdx: noteStartIdx,
          noteName: noteName,
          value: this.settings.selectedNotes.findIndex(item => this.scaleNotes[item] === noteName) > -1 && curFret >= this.settings.fretBoardRange.low && curFret <= this.settings.fretBoardRange.high ? 1 : 0,
          root: noteName === this.scaleNotes[this.settings.selectedRootNote] ? 1 : 0
        }
        if (noteStartIdx < this.scaleNotes.length - 1) {
          noteStartIdx++;
        } else {
          noteStartIdx = 0;
        }
        stringNotes.push(noteObj);
        curFret++;
      }
      this.strings.push(stringNotes);
    });
    console.log(this.strings);
  }

  manualSelectNotes() {
    this.settings.manuallySelectedNotes.forEach(item => {
      this.strings[item.string][item.fretNumber].value = 1;
    });
  }

  resetChordSelections() {
    this.chordSelections = [];
  }

  updateChordName($event) {
    console.log($event);
    this.chordName = $event.value;
  }

  updateRootName($event) {
    this.rootName = $event.value;
  }

}
