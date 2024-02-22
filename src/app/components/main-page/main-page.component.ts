import { Component } from '@angular/core';
import { CalendarWrapperComponent } from '../calendar-wrapper/calendar-wrapper.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CalendarWrapperComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
