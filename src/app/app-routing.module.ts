import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipe-list', pathMatch: 'full' },
  { path: 'add-recipe', component: AddRecipeComponent },
  { path: 'recipe-detail/:id', component: RecipeDetailComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'edit-recipe/:id', component: EditRecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
