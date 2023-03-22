import { Component, OnInit } from '@angular/core';

import * as Tone from 'tone';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  fretMarkers = [];

  noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  notes = [
    {
      text: 'C',
      value: 0,
      root: 0
    },
    {
      text: 'C#',
      value: 0,
      root: 0
    },
    {
      text: 'D',
      value: 0,
      root: 0
    },
    {
      text: 'D#',
      value: 0,
      root: 0
    },
    {
      text: 'E',
      value: 0,
      root: 0
    },
    {
      text: 'F',
      value: 0,
      root: 0
    },
    {
      text: 'F#',
      value: 0,
      root: 0
    },
    {
      text: 'G',
      value: 0,
      root: 0
    },
    {
      text: 'G#',
      value: 0,
      root: 0
    },
    {
      text: 'A',
      value: 0,
      root: 0
    },
    {
      text: 'A#',
      value: 0,
      root: 0
    },
    {
      text: 'B',
      value: 0,
      root: 0
    }
  ];

  numFrets = 25;
  numOctaves = 3;

  scaleMode = null;
  scaleMajor = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1];
  scaleMinor = [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0];
  scales = [
    {
      label: 'Major',
      scale: this.scaleMajor
    },
    {
      label: 'Minor',
      scale: this.scaleMinor
    },
  ];

  strings = [
    {
      name: 'E',
      notes: []
    },
    {
      name: 'B',
      notes: []
    },
    {
      name: 'G',
      notes: []
    },
    {
      name: 'D',
      notes: []
    },
    {
      name: 'A',
      notes: []
    },
    {
      name: 'E',
      notes: []
    }
  ];

  root = null;

  constructor() { }

  ngOnInit(): void {
    this.initFretMarkers();
    this.initStrings();
  }

  getArrayItemIndexByKey(key: string, value: any, array: any[]): number {
    return array.findIndex(x => x[key] === value);
  }

  getPlaySampleArray(): Array<any> {
    let playSampleArray = [];
    const upArray = [];
    const downArray = [];
    const startIdx = this.getArrayItemIndexByKey('text', this.root, this.notes);
    let curIdx = startIdx;
    let octave = 3;

    for (let o = 0; o < this.numOctaves; o++) {
      for (let i = 0; i < 12; i++) {
        const item = this.notes[curIdx];
        if (item.value === 1) {
          upArray.push(item.text + octave);
          downArray.push(item.text + octave);
        }
        if (curIdx < this.notes.length - 1) {
          curIdx++;
        } else {
          curIdx = 0;
          octave++;
        }
      }

    }

    downArray.reverse();
    playSampleArray = [...upArray, ...downArray];

    console.log(playSampleArray);
    return playSampleArray;
  }

  handleModeSelection($event) {
    console.log($event.value);
    this.selectAllNotes();
    this.scaleMode = $event.value;
  }

  handleNoteSelection(idx: number): void {
    this.notes[idx].value = this.notes[idx].value === 0 ? 1 : 0;
    this.updateFretboard();
  }

  handleRandomizeNoteSelections(): void {
    this.notes.forEach(item => {
      const rand = Math.random() >= 0.5;
      item.value = rand === false ? 0 : 1;
    });
    this.resetRootNotes();
    this.root = null;
    this.updateFretboard();
  }

  handleResetNoteSelections(): void {
    this.notes.forEach(item => {
      item.value = 0;
    });
    this.updateFretboard();
  }

  handleRootNoteSelection($event): void {
    this.root = $event.value;
    console.log(this.root);
    this.updateFretboard();
  }

  handleScaleSelection($event) {
    let startIdx = this.notes.findIndex(item => item.text === this.root);
    const scale = $event.value.scale;
    let i = 0;
    for(i; i < this.notes.length; i++) {
      console.log(scale[i], this.notes[startIdx], startIdx);
      this.notes[startIdx].value = scale[i] === 1 ? 1 : 0;
      if(startIdx < this.notes.length - 1) {
        startIdx++;
      } else {
        startIdx = 0;
      }
    }
    this.updateFretboard();
    console.log($event.value.scale, startIdx, this.notes);
  }

  handleStringSelection($event, stringNum) {
    console.log('handleStringSelection', $event.value, stringNum, this.strings[stringNum]);
    /*setTimeout(() => { 
      this.strings[stringNum].name = $event.value.text;
      this.initStrings();
      this.updateFretboard();
     }, 500);*/
  }

  initFretMarkers(): void {
    let i = 0;
    while (i < this.numFrets - 1) {
      let isMarker = false;
      if (
        i === 1 ||
        i === 3 ||
        i === 5 ||
        i === 7 ||
        i === 9 ||
        i === 12 ||
        i === 15 ||
        i === 17 ||
        i === 19 ||
        i === 21 ||
        i === 23
      ) {
        isMarker = true;
      }
      this.fretMarkers.push(isMarker);
      i++;
    }
  }

  initStrings(): void {
    let curFret = 0;
    let noteStartIdx = 0;
    this.strings.forEach(stringItem => {
      stringItem.notes = [];
      curFret = 0;
      noteStartIdx = this.getArrayItemIndexByKey('text', stringItem.name, this.notes);
      while (curFret < this.numFrets) {
        stringItem.notes.push(this.notes[noteStartIdx]);
        if (noteStartIdx < this.notes.length - 1) {
          noteStartIdx++;
        } else {
          noteStartIdx = 0;
        }
        curFret++;
      }
    });
    console.log(this.strings);
  }

  playSample(): void {
    const playSampleArray = this.getPlaySampleArray();
    const synth = new Tone.AMSynth().toDestination();
    let now = Tone.now();
    const duration = 0.2;
    let i = 0;

    for (i = 0; i < playSampleArray.length; i++) {
      synth.triggerAttackRelease(playSampleArray[i], '8n', now);
      now += duration;
    }

  }

  resetRootNotes(): void {
    this.notes.forEach(item => {
      item.root = 0;
    });
  }

  selectAllNotes(): void {
    this.notes.forEach(item => {
      item.value = 1;
    });
  }

  updateRootNoteSelection(): void {
    this.notes.forEach(item => {
      if (item.text === this.root) {
        item.root = 1;
      } else {
        item.root = 0;
      }
    });
  }

  updateFretboard() {
    if (this.root !== null) {
      this.updateRootNoteSelection();
    }
  }

}
