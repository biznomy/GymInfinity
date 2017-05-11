import {Component} from '@angular/core';
import {StyleSheet} from 'react-native';

@Component({
  selector: 'exercises-list',
  host: {position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'},
  template: `
    <ScrollView [styleSheet]="styles.container">
      <RefreshControl tintColor="#ce0058" title="Refreshing..."></RefreshControl>
      <gym-exercises  [platform]="'android'"></gym-exercises>
    </ScrollView>
  `
})

export class ExercisesListPage {
  styles: any;
  
  constructor() {
    this.styles = StyleSheet.create({
      container: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF'
      }
    });
  }
}