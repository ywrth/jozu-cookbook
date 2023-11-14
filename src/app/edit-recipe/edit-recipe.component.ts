import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})

export class EditRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private fb: FormBuilder
  ) {
  // Initialize the form group
  this.recipeForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    instructions: ['', Validators.required],
    ingredients: ['', Validators.required],
    imageUrl: ['', [Validators.required, this.imageUrlValidator()]]
  });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.recipeService.getRecipeById(this.id).subscribe((recipeData) => {
      if (recipeData) {
        this.recipeForm.patchValue({
          name: recipeData.name || '',
          description: recipeData.description || '',
          instructions: recipeData.instructions || '',
          ingredients: recipeData.ingredients || '',
          imageUrl: recipeData.imageUrl || '' // Handle potentially missing imageUrl
        });
      } else {
        console.log('No recipe found with the given ID.');
        // Handle scenario when recipe is not found
      }
    }); // This closing bracket and parentheses were missing
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
      this.recipeService.updateRecipe(this.id, recipeData).then(() => {
        console.log('Recipe updated!');
        // Additional logic after successful update
      });
    }
  }
}
