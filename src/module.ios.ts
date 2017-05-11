import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactNativeiOSModule} from 'angular2-react-native';
import {HelloApp} from './hello';

@NgModule({
  declarations: [HelloApp],
  imports: [ReactNativeiOSModule, CommonModule],
  bootstrap: [HelloApp]
})
export class HelloModule {}