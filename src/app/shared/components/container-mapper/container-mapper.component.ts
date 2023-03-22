import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-mapper',
  templateUrl: './container-mapper.component.html',
  styleUrls: ['./container-mapper.component.scss']
})
export class ContainerMapperComponent implements OnInit {

  settingsFretboard = {
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

  scaleAndChordSettings = {
    visible: false
  }

  constructor() { }

  ngOnInit(): void {
  }

  updateSettings($event, type) {
    console.log('updateSettings', $event, type);
    switch (type) {
      case 'fretboard':
        this.settingsFretboard = $event;
        break;
      case 'scaleAndChord':
        break;
      default:
    }
  }

}
