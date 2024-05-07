import { Component } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { GeocodingSearchResult } from '../../types/geocoding.type';
import { GeocodingService } from '../../services/geocoding.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private inputSearch = new Subject<string>();
  cities$!: Observable<GeocodingSearchResult[]>;
  selectedCity = '';

  constructor(private geoService: GeocodingService) {}

  ngOnInit(): void {
    this.cities$ = this.inputSearch.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((search) => this.geoService.search(search))
    );
  }

  search(input: string) {
    this.inputSearch.next(input);
  }

  citySelected(selecttion: string) {
    this.selectedCity = selecttion;
  }
}
