import {Component} from '@angular/core';
import {StyleSheet} from 'react-native';

@Component({
  selector: 'home-page',
  host: {position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'},
  template: `
   <dashboard-grid [platform]="'ios'"></dashboard-grid>
  `
})

export class HomePage {
  constructor() {
    
  }
}

