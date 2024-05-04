import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


import { HeroesService } from '../../services/hero.service';
import { Hero, Publisher } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{
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

  public constructor (
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void{
    if( !this.router.url.includes('edit') ) return;
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroService.getHeroById( id ))
      ).subscribe( hero => {

        if( !hero ) return this.router.navigateByUrl('/');

        this.heroForm.reset( hero );
        return;
      });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }
  onSumit():void {
    if( this.heroForm.invalid ) return;

    if( this.currentHero.id ){
      this.heroService.updateHero( this.currentHero )
        .subscribe( hero => {
          this.showSnackbar(`${ hero.superhero } updated!`);
        });
        return;
      }
      this.heroService.addHero( this.currentHero )
      .subscribe( hero => {
        this.router.navigate([ '/hero/edit', hero.id ])
        this.showSnackbar(`${ hero.superhero } created!`);
      })
  }
  showSnackbar( message: string ): void {
    this.snackbar.open( message, 'done', {
      duration: 2500
    })
  }
}
