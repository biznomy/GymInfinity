import {Component} from '@angular/core';
import {StyleSheet} from 'react-native';

@Component({
  selector: 'stats-form-page',
  host: {position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'},
  template: `
    <ScrollView [styleSheet]="styles.container">
      <stat-form  [platform]="'android'"></stat-form>
    </ScrollView>
  `
})

export class StatsFormPage {
 
  styles: any;
  
  constructor() {
    this.styles = StyleSheet.create({
      container: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        alignItems:'center'
      }
    });
  }

}