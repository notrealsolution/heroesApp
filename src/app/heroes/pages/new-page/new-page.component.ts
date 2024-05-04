import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/hero.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true }),
    publisher:        new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_imag:        new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ];

  public constructor ( private heroService: HeroesService){}
  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }
  onSumit():void {
    if( this.heroForm.invalid ) return;

    if( this.currentHero.id ){
      this.heroService.updateHero( this.currentHero )
        .subscribe( hero => {
          // TODO: mostrar snackbar
        });
      return;
    }
    this.heroService.addHero( this.currentHero )
      .subscribe( hero => {
        // TODO: mostrar snackbar, y navegar a /heroes/edit/ hero.id
      })
  }
}
