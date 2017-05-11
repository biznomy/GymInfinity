import {Component,Input} from '@angular/core';
import {AsyncStorage} from 'react-native';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'stats',
  template: `
      <View *ngIf="loading" [styleSheet]="styles.platform.loader">
        <ActivityIndicator color="#2d566b" size="large"></ActivityIndicator>
      </View>
      <View *ngIf="!loading">
        <View *ngFor="let stat of stats;let i = index" rippleFeedback="#2E9298" (tap)="onSelect(i)" 
          [styleSheet]="[styles.platform.withShadow,styles.platform.listItem]">
              <View [style]="{position:'absolute',left:5,right:5}">
                <Text [styleSheet]="styles.platform.title">{{stat.exercise}} ({{stat.weight}})</Text>
                <Text [styleSheet]="styles.platform.subTitle" numberOfLines=2>{{stat.notes | ellipsis:45}}</Text>
                <View (tap)="deleteStat(i,$event);" [styleSheet]="styles.platform.deleteBtn">
                  <Text [style]="{color:'red'}">Delete</Text>
                </View>
              </View>
        </View>
      </View>
  `
})

export class Stats {
    loading:boolean = true;
    styles:{};
    stats:Array<{weight:string,notes:string,date:Date,exercise:string}>;
    @Input() platform:string = 'android';
  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.loading = false;
      this.styles = {
          platform:{},
          ios:{
            loader:{position:'absolute',left:0,right:0,alignItems: 'center', padding:5,top:10},
            listItem: {
              flex: 1, flexDirection: 'row',alignItems: 'center', margin:1, minHeight:60
            },
            image: {height: 50, width: 50, marginLeft:8,borderRadius:10},
            withShadow: {
                shadowColor: "#6c7b7a",shadowOpacity: 0.5, shadowRadius: 1,
                shadowOffset: {
                  height: 0.5,width: -0.5
                }
            },
            deleteBtn:{position:'absolute',right:10,top:10,height:40},
            title:{fontSize:13,fontWeight:'bold',color:'#6c7b7a',paddingLeft:10,marginTop:-5},
            subTitle:{fontSize:13,color:'#6c7b7a',marginTop:5,paddingLeft:12}
          },
          android:{
            loader:{marginTop:20,marginLeft:180},
            listItem: {
              flex: 1, flexDirection: 'row',alignItems: 'center', margin:1, minHeight:70
            },
            image: {height: 60, width: 60, marginLeft:8,borderRadius: 10},
            withShadow: {
                 borderBottomColor: "#6c7b7a",
                 borderBottomWidth: 0.5
            },
            deleteBtn:{position:'absolute',right:15,top:15,height:40},
            title:{fontSize:18,fontWeight:'bold',color:'#6c7b7a',paddingLeft:10,marginTop:10},
            subTitle:{fontSize:16,color:'#6c7b7a',padding:12}
          }
      };
  }

  getStats(){
    var self = this;
    AsyncStorage.getItem('mystats', (err, result) => {
       self.stats = JSON.parse(result);
    });
  }

  ngOnInit() {
      this.styles['platform'] = this.styles[this.platform];
      var queryParams  = this.route.queryParams.subscribe(params => {
          this.getStats();
      });
  }

  onSelect(index){
    this.router.navigate(['stats-form-page'],{
        queryParams:{index:index,type:"detail"}
    });
  }

  deleteStat(index,event){
      event.stopPropagation();
      event.preventDefault();
      var self = this;
       self.stats.splice(index,1);
       AsyncStorage.setItem('mystats', JSON.stringify(self.stats), () => {
         console.log('update stats');
       });
  }

}

