import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

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

  deleteRecipe(id: string) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id).then(() => {
        alert('Recipe deleted successfully');
        this.loadRecipes(); // Reload the list to reflect the deletion
      });
    }
  }
}
