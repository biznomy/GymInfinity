import {Component, ViewChild} from '@angular/core';
import {ActionSheetIOS} from 'react-native';
import {Navigator} from 'angular2-react-native/ios';

@Component({
  selector: 'root-page',
  host: {position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'},
  template: `<Navigator barTintColor="#2d566b" tintColor="#FFFFFF" titleTextColor="#FFFFFF" [itemWrapperStyle]="{backgroundColor: 'rgba(206, 202, 202, 0.47)'}" ></Navigator>`
})

export class RootPage {
  constructor() {}
}
