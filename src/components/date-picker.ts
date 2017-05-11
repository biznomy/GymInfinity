import {Component,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'DatePicker',
  template: `
    
  `
})

export class DatePicker {
  styles:{};
  selectedDate: Date = new Date('2016-03-18');
  @Input() styleSheet:string = 'android';
  @Output() change: EventEmitter<any> = new EventEmitter();
  constructor() {
      this.styles = {
          
      };
     
  }

}

