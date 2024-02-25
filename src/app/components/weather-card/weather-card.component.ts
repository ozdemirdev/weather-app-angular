import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isSameMonth, isToday } from 'date-fns';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { WeathercodeService } from '../../services/weathercode.service';
import { CustomizeService } from '../../services/customize.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  providers: [WeathercodeService],
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  @Input() date!: Date;
  @Input() forecast!: string
  @Input() lowestTemp!: any
  @Input() highestTemp!: any
  @Input() feelsLike!: any
  @Input() weatherCode!: any
  @Input() activeDate!: Date;

  isActiveMonth: boolean = true;
  isToday: boolean = false;
  weatherCodeIcon: any = "";
  customBackgroundColor: any = "";

  faMagnifyingGlass = faPencilSquare;

  constructor(private weatherCodeService: WeathercodeService, private customizeService: CustomizeService){}

  ngOnInit(): void {
    this.isActiveMonth = isSameMonth(this.activeDate, this.date);
    this.isToday = isToday(this.date)
    this.weatherCodeIcon = this.weatherCodeService.getWeatherIcon(this.weatherCode);
    
    this.customizeService.colorSubject.subscribe(res => {
      this.customBackgroundColor =this.customizeService.getBGColor(this.weatherCode);
    })
    
    if(this.isToday){
    }
  }

  setColor(event: any){
    this.customizeService.addBackgroundColor(this.weatherCode, event.target.value);
  }
}
