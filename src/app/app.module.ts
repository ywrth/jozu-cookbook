import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

import {AngularFireModule} from '@angular/fire/compat';
import {FirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipeListComponent,
    AddRecipeComponent,
    RecipeDetailComponent,
    EditRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
   FirestoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
