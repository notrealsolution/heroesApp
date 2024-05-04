import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';


import { map } from 'rxjs/operators';
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
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`).pipe(
      map((heroes: Hero[]) => heroes.filter(hero => hero.superhero.toLowerCase().includes(query.toLowerCase())))
    );
  }
  addHero( hero: Hero): Observable<Hero> {
    const id = Math.random().toString(36).substring(2, 10);
    hero.id = id;
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero);
  }
  updateHero( hero: Hero): Observable<Hero> {
    if( !hero.id ) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero);
  }
  deleteHeroById( id:string ): Observable<boolean> {
    return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        catchError( error => of(false)),
        map( resp => true )
      );
  }
}
