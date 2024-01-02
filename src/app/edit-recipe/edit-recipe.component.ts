import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


interface Recipe {
  details: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})

export class EditRecipeComponent implements OnInit {
  public Editor = ClassicEditor;
  public editorConfig = {
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
  };

  recipeForm: FormGroup;
  id: string | null = null; // Initialize id as null

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private fb: FormBuilder
  ) {
    // Initialize the form group
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      imageUrl: [''] // No validators for imageUrl
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.recipeService.getRecipe(this.id).subscribe((recipeData: Recipe) => {
          if (recipeData) {
            this.recipeForm.patchValue({
              name: recipeData.name || '',
              details: recipeData.details || '', // Combined field
              imageUrl: recipeData.imageUrl || ''
            });
          } else {
            console.log('No recipe found with the given ID.');
            // Handle scenario when recipe is not found
          }
        });
      }
    });
  }
  
  imageUrlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const urlRegex = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;
      const valid = urlRegex.test(control.value);
      return valid ? null : { 'invalidUrl': { value: control.value } };
    };
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const recipeData = this.recipeForm.value;
      if (this.id) { // Ensure id is not null before updating
        this.recipeService.updateRecipe(this.id, recipeData).then(() => {
          console.log('Recipe updated!');
          // Additional logic after successful update
        });
      } else {
        console.log('Invalid recipe ID.');
      }
    }
  }
}