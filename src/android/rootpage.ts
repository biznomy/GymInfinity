import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {StyleSheet, BackHandler, Alert, NativeModules, processColor} from 'react-native';
import {DrawerLayout, Toolbar} from 'angular2-react-native/android';

@Component({
  selector: 'kitchensink-app',
  host: {position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'},
  template: `
    <Toolbar [styleSheet]="styles.toolbar"
    [title]="pageTitle" titleColor="#FFFFFF" (select)="handleToolbar($event)"></Toolbar>
    <View [styleSheet]="styles.content">
      <router-outlet (activate)="_lastActivated = $event"></router-outlet>
    </View>
`
})
export class RootPage {
  pageTitle:string;
  private _lastActivated: any;
  @ViewChild(DrawerLayout) drawerLayout: DrawerLayout;
  @ViewChild(Toolbar) toolbar: Toolbar;
  styles: any;
  _el : any = null;
  constructor(el: ElementRef, private router: Router, private locationStrategy: LocationStrategy) {
    this.router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        let u = res.url.split('=');
        this.pageTitle = u[u.length - 1];
        if(this.pageTitle == '/'){
          this.pageTitle  = 'Home';
        }
      }
    })
   
    NativeModules.StatusBarManager.setColor(processColor('#2d566b'), true);

    BackHandler.addEventListener('hardwareBackPress', function() {
      if ((<any>locationStrategy).canGoBack()) {
        locationStrategy.back();
      } else {
        Alert.alert(
          'Close App',
          'Are you sure you want to close the app?',
          [
            {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            {text: 'OK', onPress: () => BackHandler.exitApp()},
          ]
        );
      }
      return true;
    });
    this._el = el.nativeElement;
    this.styles = StyleSheet.create({
      toolbar: {
        backgroundColor: '#2d566b',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 50,
        alignItems:'center'
      },
      content: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 50,
        bottom: 0,
        backgroundColor: 'rgba(206, 202, 202, 0.47)'
      }
    });
  }

}