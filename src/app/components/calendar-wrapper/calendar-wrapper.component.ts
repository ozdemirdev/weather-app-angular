import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { format, getDaysInMonth, startOfMonth, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-calendar-wrapper',
  standalone: true,
  imports: [CommonModule, WeatherCardComponent],
  templateUrl: './calendar-wrapper.component.html',
  styleUrl: './calendar-wrapper.component.scss'
})
export class CalendarWrapperComponent {

  @Input() selectedDate: Date = new Date();

  getMonthDays(): Date[] {
    const startOfMonthDate = startOfMonth(this.selectedDate);
    const endOfMonthDate = addDays(startOfMonthDate, getDaysInMonth(this.selectedDate) - 1);
    const startOfWeekDate = startOfWeek(startOfMonthDate, { weekStartsOn: 1 }); // Monday as first day
    const endOfWeekDate = endOfWeek(endOfMonthDate, { weekStartsOn: 1 }); // Monday as first day
    const days: Date[] = [];

    let currentDate = startOfWeekDate;
    while (currentDate <= endOfWeekDate) {
      days.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }

    return days;
  }

  getDayLabel(day: Date): string {
    return format(day, 'eeeeee');
  }

  getDayD(day: Date): string {
    return format(day, 'd')
  }
}
