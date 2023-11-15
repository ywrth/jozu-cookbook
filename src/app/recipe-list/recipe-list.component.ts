import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes!: Observable<any[]>;

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getAllRecipes();
  }

  editRecipe(recipe: any) {
    // Assuming you have a route defined for the "edit-recipe" component
    this.router.navigate(['/edit-recipe', recipe.id]); // Replace 'recipe.id' with the appropriate identifier for your recipe
  }

  selectedRecipe: any;

  openRecipe(recipe: any) {
    this.selectedRecipe = recipe;
  }
}
