import { Component, OnInit } from '@angular/core';
import { CalendarWrapperComponent } from '../calendar-wrapper/calendar-wrapper.component';
import { CalendarNavigatorComponent } from '../calendar-navigator/calendar-navigator.component';
import { WeatherService } from '../../services/weather.service';
import { startOfMonth, endOfMonth, getDaysInMonth, addDays, endOfWeek, startOfWeek } from 'date-fns';
import { CustomizeService } from '../../services/customize.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CalendarWrapperComponent, CalendarNavigatorComponent],
  providers: [WeatherService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit{
  activeDate!: Date;
  weatherData: any = {};
  forecastData: any = {};
  days!: Date[];

  constructor(private weatherService: WeatherService, private custom: CustomizeService){
  }

  dateTrigger(event: any){
    this.weatherData = {};
    this.forecastData = {};
    this.activeDate = event;
    this.days = this.getMonthDays();
    this.getWeatherData(this.days[0], endOfMonth(this.activeDate))
  }

  getWeatherData(start: Date, end: Date) {
    this.weatherService.getWeaherData(start, end)[0]?.subscribe((res: any) => {
      this.weatherData = res.daily
      this.weatherService.getWeaherData(start, end)[1]?.subscribe((featureRes: any) => {
        this.forecastData = Object.assign(featureRes.daily) 
      })
    })
  }

  getMonthDays(): Date[] {
    const startOfMonthDate = startOfMonth(this.activeDate);
    const endOfMonthDate = addDays(startOfMonthDate, getDaysInMonth(this.activeDate) - 1);
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

  ngOnInit(): void {
    this.days = this.getMonthDays();
  }

}
