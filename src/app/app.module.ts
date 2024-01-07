import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
import { FormsModule } from '@angular/forms';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SignupComponent } from './signup/signup.component';


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
    RecipeModalComponent,
    WelcomePageComponent,
    SignupComponent
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
    FormsModule, // Include FormsModule here,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
