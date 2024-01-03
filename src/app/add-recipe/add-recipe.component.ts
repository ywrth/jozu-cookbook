import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
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
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat'
  };


  constructor(private fb: FormBuilder, private recipeService: RecipeService) {
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
      });
    }
  }
}