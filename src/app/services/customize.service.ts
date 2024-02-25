import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {

  private customBackgroundPerWeatherCode: any = {
  }

  public colorSubject = new BehaviorSubject({});

  constructor() {
    this.getCache();
    this.setCache();
  }

  getBGColor(weatherCode: string){
    if(this.customBackgroundPerWeatherCode?.hasOwnProperty(weatherCode)){
      return this.customBackgroundPerWeatherCode[weatherCode]
    }
    else{
      return "#1F2544";
    }
    
  }

  addBackgroundColor(weatherCode: string, bgColor: string){
    this.customBackgroundPerWeatherCode[weatherCode] = bgColor;
    this.colorSubject.next(this.customBackgroundPerWeatherCode)
    this.setCache();
  }
  
  setCache(){
    localStorage.setItem("customizedStyles", JSON.stringify(this.customBackgroundPerWeatherCode))
  }

  getCache(){
    const cs: string =  localStorage.getItem("customizedStyles") as string;
    if(!cs){
      this.customBackgroundPerWeatherCode = {}
    }
    else{
      this.customBackgroundPerWeatherCode = JSON.parse(cs);
    }
    
  }
}
