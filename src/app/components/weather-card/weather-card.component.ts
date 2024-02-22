import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {
  @Input() date: string | null = "";
  @Input() forecast: string = "";
  @Input() lowestTemp: number = 0;
}
