import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import { AuthGuard } from './auth.guard'; // Import AuthGuard

import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome-page', pathMatch: 'full' },
  { path: 'welcome-page', component: WelcomePageComponent },
  { path: 'recipes', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'add-recipe', component: AddRecipeComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
