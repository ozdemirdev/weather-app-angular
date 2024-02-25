import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endOfMonth, startOfMonth, getUnixTime, subMonths, isBefore, differenceInDays, addMinutes, subDays } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private date!: Date;
  private lat: string = "36.89";
  private long: string = "30.71";

  constructor(private http:HttpClient) { }

  public getWeatherOfMonth(date: Date){
    this.setDate(date);
    //this.getForecast()
    
  }

  public getWeaherData(start: Date, end: Date){
    
    const endISO = addMinutes(end, 180).toISOString().split('T')[0]
    const startISO = addMinutes(start, 180).toISOString().split('T')[0]

    if(isBefore(end, new Date())){
      return [this.getHistoric(startISO, endISO)]
    }
    if(isBefore(new Date(), start)){
      if(differenceInDays(start, new Date()) <= 16){
        return [this.getForecast()];
      }
    }
    else{
      return[this.getHistoric(startISO, subDays(new Date(), 1).toISOString().split('T')[0]),
            this.getForecast()]
    }
    return [this.http.get("")];
  }

  public getHistoric(start: string, end: string){
    return this.http.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${this.lat}&longitude=${this.long}&start_date=${start}&end_date=${end}&daily=weather_code,temperature_2m_min,temperature_2m_max,temperature_2m_mean,apparent_temperature_mean&timezone=auto`)
  }

  public getForecast(){
    return this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.long}&daily=weather_code,temperature_2m_min,temperature_2m_max,temperature_2m_mean,apparent_temperature_mean&timezone=auto&forecast_days=16`)
  }

  public setLatLong(lat :string, long: string){
    this.lat = lat;
    this.long = long;
    this.getWeatherOfMonth(this.date);
  }

  public setDate(date: Date){
    this.date = date;
  }
}

