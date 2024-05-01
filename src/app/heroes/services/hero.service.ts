import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environments } from 'environments/environments';
import { Hero } from '../interfaces/hero.interface';

@Injectable({providedIn: 'root'})
export class HeroesService {
  constructor(private http: HttpClient) { }
  private baseUrl: string = environments.baseUrl;

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }
  getHeroById ( id: string ): Observable< Hero | undefined > {
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe( catchError( error => of (undefined)));
  }
  getSuggestions( query: string ): Observable<Hero []>{

    return this.http.get<Hero[]>(`/heroes?q=${ query }&_limit=6`);

  }
}
