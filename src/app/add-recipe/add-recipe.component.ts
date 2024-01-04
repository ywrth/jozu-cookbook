import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router'; // Import Router
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AbstractControl } from '@angular/forms';

export function imageUrlValidator(): Validators {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const urlRegex = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;
    const valid = urlRegex.test(control.value);
    return valid ? null : { 'invalidUrl': { value: control.value } };
  };
}

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  public Editor = ClassicEditor;
  recipeForm: FormGroup;

  editorConfig = {
    apiKey: 'gioa3daqcl5074u60ll57jjpe44minrpck44fu1t5x580zty', // Replace with your TinyMCE API key
    plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
  };

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router // Inject Router
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required], // Combined field
      imageUrl: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.recipeForm.valid) {
      this.recipeService.addRecipe(this.recipeForm.value).then(() => {
        console.log('Recipe added!');
        this.recipeForm.reset();

        // Navigate back to the recipes page after adding the recipe
        this.router.navigate(['/recipes']); // Adjust the route path as needed
      });
    }
  }
}
