import {Component} from '@angular/core';
import {StyleSheet} from 'react-native';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'stats-list',
  host: {position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'},
  template: `
    <ScrollView [styleSheet]="styles.container">
      <RefreshControl tintColor="#ce0058" title="Refreshing..."></RefreshControl>
      <stats [platform]="'android'"></stats>
    </ScrollView>
    <View [styleSheet]="[styles.fabBtn]" (tap)="newStat()"><Text [styleSheet]="[styles.fabBtnText]">+</Text></View>
  `
})

export class StatsListPage {
  styles: any;
  
  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.styles = StyleSheet.create({
        container: {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFF'
        },
        fabBtn:{
                width: 55,height: 55,borderRadius: 30,
                backgroundColor: '#2d566b',
                position: 'absolute',bottom: 10,
                right: 10,alignItems:'center',textAlign:'center'
            },
            fabBtnText:{
              color:'#fff',
              fontSize:28,
              fontWeight:'bold',
              marginTop:5
            }
    });
  }

  newStat(){
     this.router.navigate(['stats-form-page'],{
        queryParams: {type:"new"}
     });
  }

}