import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { format, getDaysInMonth, startOfMonth, addDays, startOfWeek, endOfWeek, getUnixTime } from 'date-fns';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-calendar-wrapper',
  standalone: true,
  imports: [CommonModule, WeatherCardComponent],
  providers: [WeatherService],
  templateUrl: './calendar-wrapper.component.html',
  styleUrl: './calendar-wrapper.component.scss'
})
export class CalendarWrapperComponent implements OnInit, OnChanges{

  @Input() selectedDate: Date = new Date();
  @Input() days!: any[];
  @Input() weatherData: any = {};
  @Input() forecastData: any = {};

  splittedDays: any[] = [];

  constructor(private weatherService: WeatherService, private cdr: ChangeDetectorRef) { }

  getDayLabel(day: Date): string {
    return format(day, 'eeeeee');
  }

  getDayD(day: Date): string {
    return format(day, 'd')
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.splitDays()
  }

  splitDays(){
    this.splittedDays = [this.days.slice(0, this.weatherData['temperature_2m_mean']?.length), 
    this.days.slice(this.weatherData['temperature_2m_mean']?.length, this.days.length)]
  }

}
