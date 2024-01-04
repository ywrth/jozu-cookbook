import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import anime from 'animejs/lib/anime.es.js';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];
  showModal: boolean = false;
  selectedRecipe: any;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
    this.initWaveAnimation();
  }

  initWaveAnimation() {
    const wave1 = "M0 160L50 172.646C100 185.292 200 210.585 300 280.877C400 351.17 500 421.462 600 351.17C700 280.877 800 210.585 900 160.292C1000 110 1100 210.585 1150 260.877L1200 311.154V-40H1150C1100 -40 1000 -40 900 -40C800 -40 700 -40 600 -40C500 -40 400 -40 300 -40C200 -40 100 -40 50 -40H0V160Z",
    wave2 = "M0 200L50 188.096C100 176.19 200 152.381 300 152.381C400 152.381 500 176.19 600 164.286C700 152.381 800 104.762 900 92.857C1000 80.952 1100 104.762 1150 116.667L1200 128.571V-80H1150C1100 -80 1000 -80 900 -80C800 -80 700 -80 600 -80C500 -80 400 -80 300 -80C200 -80 100 -80 50 -80H0V200.306Z",
    wave3 = "M0 200L50 176.19C100 152.381 200 104.762 300 33.334C400 -38.0952 500 -133.333 600 -97.619C700 -61.905 800 104.762 900 128.571C1000 152.381 1100 33.334 1150 -26.1905L1200 -84.286V-80H1150C1100 -80 1000 -80 900 -80C800 -80 700 -80 600 -80C500 -80 400 -80 300 -80C200 -80 100 -80 50 -80H0V200.306Z",
    wave4 = "M0 100L50 72.222C100 44.4444 200 -11.1111 300 44.4444C400 100 500 266.666 600 322.222C700 377.778 800 322.222 900 308.333C1000 294.444 1100 322.222 1150 336.111L1200 350V-80H1150C1100 -80 1000 -80 900 -80C800 -80 700 -80 600 -80C500 -80 400 -80 300 -80C200 -80 100 -80 50 -80H0V100.306Z";
  
    anime({
      targets: '.wave-top > path',
      easing: 'linear',
      duration: 20000,
      loop: true,
      d: [
        { value: [wave1, wave2] },
        { value: wave3 },
        { value: wave4 },
        { value: wave1 },
      ],
    });
  }
  
  

  loadRecipes() {
    this.recipeService.getAllRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  openModal(recipe: any) {
    this.selectedRecipe = recipe;
    this.showModal = true;
  }

  handleModalClose(event: boolean) {
    this.showModal = event;
  }

    }
  