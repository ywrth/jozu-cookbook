import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { EditorModule } from '@tinymce/tinymce-angular';
import { RecipeModalComponent } from './recipe-modal/recipe-modal.component';



@NgModule({
  declarations: [
    AppComponent, 
    NavbarComponent,
    RecipeListComponent,
    AddRecipeComponent,
    RecipeDetailComponent,
    EditRecipeComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    RecipeModalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
   FirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
EditorModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
