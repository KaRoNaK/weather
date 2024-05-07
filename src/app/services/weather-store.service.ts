import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocationWeather } from '../types/locationWeather.type';

@Injectable({
  providedIn: 'root',
})
export class WeatherStoreService {
  constructor() {}

  private readonly _locationWeather = new BehaviorSubject<
    (LocationWeather & { name: string }) | null
  >(null);

  readonly locationWeather$ = this._locationWeather.asObservable();

  get locationWeather() {
    return this._locationWeather.getValue();
  }

  set locationWeather(val: (LocationWeather & { name: string }) | null) {
    this._locationWeather.next(val);
  }
}
