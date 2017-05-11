import {Component} from '@angular/core';
import {StyleSheet} from 'react-native';

@Component({
  selector: 'exercise-detail-page',
  host: {position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'},
  template: `
    <ScrollView [styleSheet]="styles.container">
      <exercise-detail [platform]="'android'"></exercise-detail>
    </ScrollView>
  `
})

export class ExerciseDetailPage {
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