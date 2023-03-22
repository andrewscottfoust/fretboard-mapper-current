import { Component, Input, Output, EventEmitter, OnChanges, OnInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';

import * as Tone from 'tone';

@Component({
  selector: 'app-sample-player',
  templateUrl: './sample-player.component.html',
  styleUrls: ['./sample-player.component.scss']
})
export class SamplePlayerComponent implements OnInit, OnChanges {

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
  numOctaves = 3;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.settings = changes.settings ? changes.settings.currentValue : this.settings;
    console.log(this.settings);
  }

  getArrayItemIndexByKey(key: string, value: any, array: any[]): number {
    return array.findIndex(x => x[key] === value);
  }

  getPlaySampleArray(): Array<any> {
    let playSampleArray = [];
    const upArray = [];
    const downArray = [];
    const startIdx = this.settings.selectedNotes.findIndex(item => item === this.settings.selectedRootNote);
    let octave = 3;
    console.log('start index: ', startIdx, this.settings);

    for (let o = 0; o < this.numOctaves; o++) {
      this.settings.selectedNotes.forEach(note => {
        upArray.push(this.notes[note].text + (o + octave));
        downArray.push(this.notes[note].text + (o + octave));
      });

    }

    var shiftedUpArray = [...upArray.slice(startIdx, (upArray.length - startIdx)), ...upArray.slice(0, startIdx)];
    var shiftedDownArray = [...downArray.slice(startIdx, (downArray.length - startIdx)), ...downArray.slice(0, startIdx)];
    shiftedDownArray.reverse();
    playSampleArray = [...upArray, ...downArray];

    console.log(playSampleArray);
    return playSampleArray;
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

}
