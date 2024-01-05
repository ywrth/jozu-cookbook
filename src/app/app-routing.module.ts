import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';

const routes: Routes = [
  { path: '', component: RecipeListComponent }, // Default route
  { path: 'recipes', component: RecipeListComponent },
  { path: 'add-recipe', component: AddRecipeComponent },
  // ... other routes ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
