import {Component,Input} from '@angular/core';
import {StyleSheet,Alert} from 'react-native';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'dashboard-grid',
  host: {position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'},
  template: `
  <ScrollView vertical="true">
      <View [styleSheet]="styles.container">
        <View [style]="{flexDirection: 'row'}" *ngFor="let row of dashboard;" >
          <View [styleSheet]="[styles.platform.gridBox,styles.withShadow]" opacityFeedback *ngFor="let col of row;" (tap)="onSelect(col)">
              <Image [styleSheet]="[styles.platform.image]" [source]="col.icon"></Image>
              <Text [styleSheet]="styles.platform.title">{{col.title}}</Text>
          </View>
        </View>
      </View>
  </ScrollView>
  <View [styleSheet]="[styles.infoContainer,styles.withShadow]">
        <Image [styleSheet]="styles.tipsImage" [source]="{uri:angularLogo}"></Image>
        <View [style]="{padding: 5}">
          <Text [styleSheet]="styles.title">Tip of the day : Top off your brake fluid</Text>
          <Text [styleSheet]="styles.title" [style]="{fontWeight: 'bold'}">Check  brake fluid monthly</Text>
        </View>
  </View>
`
})

export class DashboardGrid {
  styles: any;
  dashboard:Array<Array<{id:string,title:string,icon:string,routerLink:string}>>;
  angularLogo: string = 'http://www.liftingrevolution.com/wp-content/uploads/2016/04/how-to-master-front-squat.jpg';
  @Input() platform:string = 'ios';
  constructor( private route: ActivatedRoute,private router: Router) {
          this.dashboard =[
            [
                {id:'fvoct',title:"Chest",icon:require('../assets/chest.png'),routerLink:"exercises-list"},
                {id:'16ipth',title:"Shoulder",icon:require('../assets/shoulder.png'),routerLink:"exercises-list"},
                {id:'1a030h',title:"Lats",icon:require('../assets/lats.png'),routerLink:"exercises-list"}
            ],
            [
                {id:'k1l1d',title:"Bicep",icon:require('../assets/bicep.png'),routerLink:"exercises-list"},
                {id:'1fnp9d',title:"Tricep",icon:require('../assets/tricep.png'),routerLink:"exercises-list"},
                {id:'qrs69',title:"Squats",icon:require('../assets/squats.png'),routerLink:"exercises-list"}],
            [
                {id:'13edwx',title:"SixPack",icon:require('../assets/sixpack.png'),routerLink:"exercises-list"},
                {id:'fvoct',title:"Stats",icon:require('../assets/stats.jpg'),routerLink:"stats-list"},
                {id:'1hgffh',title:"Diet",icon:require('../assets/diet.jpg'),routerLink:"exercises-list"}]
            ]
  }

    ngOnInit() {
        this.styles = {
                    container: {
                        flex: 1,
                        alignItems: 'center',
                        marginTop:15
                    },
                    infoContainer:{
                        flexDirection: 'row',
                        position: 'absolute', left: 0, bottom: 0, right: 0,
                        height:70,
                        padding:5,
                        paddingLeft:10
                    },
                    tipsImage: {
                        height: 60,
                        width: 60,
                        borderRadius:50
                    },
                    platform:{},
                    ios:{
                      title:{
                        fontSize: 12,fontWeight:'bold',padding: 3,color:'#6c7b7a'
                      },
                      image:{height:70,width:70,marginTop:10,borderRadius:50},
                      gridBox:{ alignItems: 'center',width:95, height:105,
                      margin: 4 }
                    },
                    android:{
                      title:{
                        fontSize: 18,fontWeight:'bold',padding: 4,color:'#6c7b7a'
                      },
                      image:{height:90,width:90,marginTop:10,borderRadius:50},
                      gridBox:{ alignItems: 'center',width: 120, height: 135,margin: 4 }
                    },
                    withShadow: {
                        backgroundColor: '#fafafa',
                        borderRadius: 3,
                        shadowColor: "#DDDDDD",
                        shadowOpacity: 1,
                        shadowRadius: 2,
                        shadowOffset: {
                          height: 2,
                          width: -2
                        }
                }
        };
        this.styles.platform = this.styles[this.platform];
    }

    onSelect(col){
       this.router.navigate([col.routerLink],{
        queryParams: {id:col.id,title:col.title}
       });
    }

}

