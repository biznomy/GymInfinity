import {NgModule, Provider} from '@angular/core';
import {CommonModule, LocationStrategy} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactNativeiOSModule, ReactNativeRouterModule, ReactNativeHttpModule, ReactNativeLocationStrategy} from 'angular2-react-native';
import {RootPage}   from './rootpage';

//components
import {DashboardGrid} from '../components/dashboard-grid';
import {GymExercises} from '../components/gym-exercises';
import {ExerciseDetail} from '../components/exercise-detail';
import {Stats} from '../components/stats';
import {StatForm} from '../components/stat-form';

//pages
import {HomePage} from "./home";
import {ExercisesListPage} from "./exercises-list";
import {ExerciseDetailPage} from './exercise-detail-page';
import {StatsListPage} from "./stats-list";
import {StatsFormPage} from './stats-form-page';


//pipes 
import {EllipsisPipe} from '../pipes/ellipsis'

const appRoutes: Routes = [
  { path: '', component: HomePage, data: {title: 'Home', backButtonTitle: 'home'}},
  { path: 'exercises-list', component: ExercisesListPage},
  { path: 'exercise-detail', component: ExerciseDetailPage ,data: {title: 'Detail'}},
  { path: 'stats-list', component: StatsListPage ,data: {title: 'Stats', backButtonTitle: 'stats'}},
  { path: 'stats-form-page', component: StatsFormPage }
];

export const providers: Provider[] = RouterModule.forRoot(appRoutes)['providers'];

@NgModule({
  declarations: [RootPage, HomePage, ExercisesListPage,ExerciseDetailPage,
                  StatsListPage,StatsFormPage,EllipsisPipe,
                 DashboardGrid,GymExercises,ExerciseDetail,Stats,StatForm],
  imports: [ReactNativeiOSModule, ReactNativeHttpModule, CommonModule, ReactNativeRouterModule],
  providers: [providers, {provide: LocationStrategy, useClass: ReactNativeLocationStrategy}],
  bootstrap: [RootPage]
})

export class InfinityReactModule {}
