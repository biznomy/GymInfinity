import {Component,Input} from '@angular/core';
import {AsyncStorage,Dimensions} from 'react-native';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location,LocationStrategy} from '@angular/common';

@Component({
  selector: 'stat-form',
  template: `

  <View *ngIf="type == 'detail'">
      <View [styleSheet]="[styles.infoBox,styles.platform.withShadow]">
            <Text [styleSheet]="styles.platform.title">{{stat.weight}}</Text>
            <Text [styleSheet]="styles.platform.description">{{stat.exercise}}</Text>
            <Text [styleSheet]="styles.platform.description">{{stat.date | date:'short'}}</Text>
            <Text [styleSheet]="styles.platform.description">{{stat.notes}}</Text>
      </View>
  </View>

  <View *ngIf="type == 'new'">

      <View [styleSheet]="[styles.margin]">
          <Text [styleSheet]="styles.platform.title">Weight</Text>
           <TextInput [styleSheet]="[styles.platform.input,styles.platform.container]"
           placeholder="weight in kg" (change)="stat.weight=$event">
          </TextInput>
      </View>

      <View [styleSheet]="[styles.margin,styles.platform.container]">
          <Text [styleSheet]="styles.platform.title">Exercises</Text>
          <Picker [selectedValue]="exercisePicker" [items]="exercises" 
          (select)="exercisePicker=$event" [styleSheet]="styles.platform.picker" >
          </Picker>
      </View>

      <View  *ngIf="platform == 'ios'" [styleSheet]="[styles.margin]">
        <View [styleSheet]="[styles.platform.container]">
          <Text [styleSheet]="styles.platform.title">DOB</Text>
          <Text [style]="{marginLeft:70,marginTop:8}" 
          (tap)="datepicker=!datepicker">{{stat.date | date:'short'}}</Text>
        </View>
        <DatePicker *ngIf="datepicker" [styleSheet]="[styles.platform.container]" 
        (change)="stat.date=$event">
        </DatePicker>
      </View>

      <View [styleSheet]="[styles.margin]">
          <Text [styleSheet]="styles.platform.title">Notes</Text>
          <TextInput [styleSheet]="[styles.platform.input,styles.platform.container]"
          placeholder="notes" (change)="stat.notes=$event">
          </TextInput>
      </View>

      <View [styleSheet]="[styles.button]" (tap)="saveStats()">
          <Text [styleSheet]="[styles.buttonText]">Save</Text>
      </View>
   
   </View>
  `
})

export class StatForm {
  typed: string = "";
  stat:{weight:string,notes:string,date:Date,exercise:string};
  switched: boolean = false;
  selected: number = 1;
  exercisePicker: number = 0;
  exercises: Array<any> = [
      {label: 'Chest', value: 'Chest'}, {label: 'Shoulder', value: 'Shoulder'},
      {label: 'Lats', value: 'Lats'},{label: 'Bicep', value: 'Bicep'},
      {label: 'Tricep', value: 'Tricep'},{label: 'SixPack', value: 'SixPack'}
  ];
  styles:{};
  type:string;

  @Input() platform:string = 'android';
  constructor(private route: ActivatedRoute,
    private router: Router,private _location: Location,
    private _locationStrategy:LocationStrategy) {
      const window = Dimensions.get('window');
      this.stat = {weight:'',notes:'',date:new Date(),exercise:this.exercises[0].value};
      this.styles = {
          infoBox:{width: window.width - 20,margin:10,padding:10},
          margin:{
            marginTop:3,
            marginBottom:3
          },
          button: {
            padding: 8,
            margin: 10,
            marginTop: 20,
            backgroundColor: '#2d566b',
            flex: 1
          },
          buttonText: {
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight:'bold',
            fontSize: 15
          },
          platform:{},
          ios:{
            title:{
              marginTop:10,marginBottom:10,fontSize:14,
              fontWeight:'bold',color:'#6c7b7a'
            },
            container:{width: 230,flexDirection:'row'},
            picker:{width: 100,height:45,marginLeft:78},
            switch:{width: 80,height:50,marginLeft:70,marginTop:4},
            input:{height:30,padding:5,borderColor:'gray', borderWidth:1,fontSize:15},
            description:{fontSize:13,color:'#6c7b7a',padding:4},
            withShadow: {
                shadowColor: "#6c7b7a",shadowOpacity: 0.5, shadowRadius: 1,
                shadowOffset: {
                 height: 0.5,width: -0.5
                }
            }
          },
          android:{
            title:{
              marginTop:10,fontSize:18,fontWeight:'bold',color:'#6c7b7a'
            },
            description:{fontSize:18,color:'#6c7b7a',padding:5},
            withShadow: {
                shadowColor: "",shadowOpacity: 0.5, shadowRadius: 1,
                shadowOffset: {
                 height: 0.5,width: -0.5
                }
            },
            container:{width: 300,flexDirection:'row'},
            picker:{width: 100,height:45,marginLeft:78},
            switch:{width: 80,height:45,marginLeft:70},
            input:{fontSize:18}
          }
      };
  }

  ngOnInit() {
      var self = this;
      self.styles['platform'] = self.styles[self.platform];
      var queryParams  = self.route.queryParams.subscribe(params => {
          self.type = params['type'];
          if(self.type == 'detail'){
             self.getStat(params['index']);
          }
      });
      queryParams.unsubscribe();
  }

  getStat(index){
    var self = this;
     AsyncStorage.getItem('mystats', (err, result) => {
       var stats = JSON.parse(result);
       self.stat = stats[index];
     });
  }

  saveStats(){
    var self = this;
     self.stat.exercise = self.exercises[self.exercisePicker].value;
      AsyncStorage.getItem('mystats', (err, result) => {
       var stats = result?JSON.parse(result):[];
       stats.push(this.stat);
       AsyncStorage.setItem('mystats', JSON.stringify(stats), () => {
         console.log('save stats');
         self._location.back();
       });
     });
  }

  ngOnDestroy(){
    this._locationStrategy.back();
  }
 
}

