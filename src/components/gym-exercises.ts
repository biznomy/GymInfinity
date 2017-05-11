import {Component,Input} from '@angular/core';
import {StyleSheet} from 'react-native';
import {ExerciseService} from '../services/exercise-service';
import {Exercise} from '../models/exercise';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'gym-exercises',
  template: `
    <View *ngIf="loading" [styleSheet]="styles.platform.loader">
      <ActivityIndicator color="#2d566b" size="large"></ActivityIndicator>
    </View>
    <View *ngIf="!loading">
      <View *ngFor="let listItem of exercises;let i = index" rippleFeedback="#2E9298" (tap)="onSelect(i)"
        [styleSheet]="[styles.platform.withShadow,styles.platform.listItem]">
            <Image *ngIf="listItem.images" [styleSheet]="styles.platform.image" [source]="{uri:listItem.images[0]}"></Image>
            <View>
               <Text [styleSheet]="styles.platform.title">{{listItem.title}}</Text>
               <Text [styleSheet]="styles.platform.subTitle" numberOfLines=2>{{listItem.description | ellipsis:45}}</Text>
            </View>
      </View>
    </View>
  `,
  providers:[ExerciseService]
})

export class GymExercises {
    loading:boolean = true;
    styles:{};
    exercises:Exercise[];
    currentPage:{id:string,title:string};
    @Input() platform:string = 'android';
  constructor(
    private exerciseService:ExerciseService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.exerciseService = exerciseService;
      this.currentPage={id:'fvoct',title:''};
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
            title:{fontSize:18,fontWeight:'bold',color:'#6c7b7a',paddingLeft:10,marginTop:10},
            subTitle:{fontSize:16,color:'#6c7b7a',padding:12}
          }
      };
  }

  getExercises(){
      var self = this;
      self.loading = true;
      this.exerciseService.getExercises(self.currentPage.id).subscribe(exercises => {
          self.exercises = exercises;
          self.loading = false;
      },error => {
          console.log(error);
          self.loading = false;
      });
  }

  ngOnInit() {
      this.styles['platform'] = this.styles[this.platform];
      var queryParams  =  this.route.queryParams.subscribe(params => {
          this.currentPage.id = params['id'];
          this.currentPage.title = params['title'];
          this.getExercises();
      });
      queryParams.unsubscribe();
  }

  onSelect(index){
    this.router.navigate(['exercise-detail'],{
        queryParams: {id:this.currentPage.id,index:index,title:this.currentPage.title}
    });
  }
 
}

