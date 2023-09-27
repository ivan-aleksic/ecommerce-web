import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { State } from '../common/state';
import { API_URL } from '../common/common';

@Injectable({
  providedIn: 'root'
})
export class WebShopFormService {

  private countriesUrl = `${API_URL}/countries`;
  private statesUrl = `${API_URL}/states`;

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates (theCountryCode: string): Observable<State[]> {

    // search url
    const searhStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searhStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    // declaring an empty array
    let data: number[] = [];

    // build an array for "Month" dropdown list
    // - start at current month and loop until month number 12
    for (let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }

    // the "of" operator from rxjs (Reactive JavaScript), will wrap an object as an Observable
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Year" downlist list
    // - start at current year and loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }

}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
    // Unwraps the JSON from Spring Data REST _embedded entry
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
