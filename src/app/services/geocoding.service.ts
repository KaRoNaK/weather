import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeocodingSearchResult } from '../types/geocoding.type';
import { EMPTY, Observable, catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private geocodeUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=';
  private geocodeUrlPostfix = '&count=10&language=en&format=json';

  constructor(private http: HttpClient) {}

  search(city: string): Observable<GeocodingSearchResult[]> {
    return this.http
      .get<{ results: GeocodingSearchResult[] }>(
        `${this.geocodeUrl}${city}${this.geocodeUrlPostfix}`
      )
      .pipe(
        map((data) =>
          data.results.filter(
            (city, idx, arr) =>
              idx ===
              arr.findIndex(
                (elem) =>
                  elem.country === city.country && elem.name === city.name
              )
          )
        ),
        catchError((error) => {
          if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, body was: ${error.error}`
            );
          }

          return EMPTY;
        })
      );
  }
}
