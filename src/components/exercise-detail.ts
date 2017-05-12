import {Component,Input} from '@angular/core';
import {Dimensions} from 'react-native';
import {ExerciseService} from '../services/exercise-service';
import {Exercise} from '../models/exercise';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {LocalStore} from '../localstorage/store';

//showsHorizontalScrollIndicator="false"
@Component({
  selector: 'exercise-detail',
  template: `
    <View *ngIf="loading" [styleSheet]="styles.platform.loader">
      <ActivityIndicator color="#2d566b" size="large"></ActivityIndicator>
    </View>
    <View *ngIf="!loading">
      <ScrollView horizontal="true" pagingEnabled="true">
        <Image *ngFor="let img of exercise.images" [styleSheet]="styles.container" [source]="{uri:img}"></Image>
      </ScrollView>
      <ScrollView>
        <View [styleSheet]="[styles.infoBox,styles.platform.withShadow]">
             <Text [styleSheet]="styles.platform.title">{{exercise.title}}</Text>
             <Text [styleSheet]="styles.platform.description">{{exercise.description}}</Text>
        </View>
      </ScrollView>
    </View>
  `,
  providers:[ExerciseService]
})

export class ExerciseDetail {
  loading:boolean = false;
  styles:{};
  exercises:Exercise[];
  exercise:Exercise;
  @Input() platform:string = 'ios';
  
  constructor(private exerciseService:ExerciseService,
     private route: ActivatedRoute,
     private router: Router,private _locationStrategy:LocationStrategy
    ) {
      this.exerciseService = exerciseService;
      this.exercise = {
          title: '',
          description:'',
          images:[]
      };
  }

  getExercises(id,index){
      index = index?index:0;
      var self = this;
      self.loading = true;

      try{
        this.exerciseService.getExercises(id).subscribe(exercises => {
            self.exercises = exercises;
            self.exercise = self.exercises[index]; 
            self.loading = false;
        },error => {
            self.loading = false;
            self.exercises = LocalStore[id];
            self.exercise = self.exercises[index]; 
        });
      }catch(err){
        self.exercises = LocalStore[id];
        self.exercise = self.exercises[index]; 
        self.loading = false;
      }
  }

  ngOnInit() {
      const window = Dimensions.get('window');
      this.styles = {
          container:{width: window.width,height:window.height/2 - 100},
          infoBox:{width: window.width - 20,margin:10,padding:10},          
          platform:{},
          ios:{
            loader:{position:'absolute',left:0,right:0,alignItems: 'center', padding:5,top:10},
            title:{fontSize:15,fontWeight:'bold',color:'#6c7b7a'},
            description:{fontSize:13,color:'#6c7b7a',padding:4},
            withShadow: {
                shadowColor: "#6c7b7a",shadowOpacity: 0.5, shadowRadius: 1,
                shadowOffset: {
                 height: 0.5,width: -0.5
                }
            }
          },
          android:{
             loader:{marginTop:20,marginLeft:180},
             title:{fontSize:20,fontWeight:'bold',color:'#6c7b7a'},
             description:{fontSize:18,color:'#6c7b7a',padding:5},
             withShadow: {
                shadowColor: "",shadowOpacity: 0.5, shadowRadius: 1,
                shadowOffset: {
                 height: 0.5,width: -0.5
                }
            }
          }
      };
      
      this.styles['platform'] = this.styles[this.platform];
      
      var queryParams  = this.route.queryParams.subscribe((params: any) => {
          this.getExercises(params['id'],params['index']);
      });

      queryParams.unsubscribe();

  }

  ngOnDestroy(){
    this._locationStrategy.back();
  }

}

