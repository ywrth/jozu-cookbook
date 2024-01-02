import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-recipe-card',
  styleUrls: ['./recipe-card.component.scss'], // Use 'styleUrls' (plural)
  templateUrl: './recipe-card.component.html'
})

export class RecipeCardComponent {
  @Input() recipe: any; // Define the 'recipe' property
}