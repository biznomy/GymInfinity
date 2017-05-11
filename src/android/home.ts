import {Component} from '@angular/core';
import {StyleSheet} from 'react-native';

@Component({
  selector: 'home-page',
  host: {position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'},
  template: `
  <RefreshControl progressBackgroundColor="#ce0058" [colors]="['#00a9e0', '#309712']" [style]="{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}">
      <dashboard-grid [platform]="'android'"></dashboard-grid>
  </RefreshControl>
`
})

export class HomePage {
  constructor() {
    
  }
}
