import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  @Input() selectedRecipe: any;
  recipeForm: FormGroup;

  editorConfig = {
    apiKey: 'gioa3daqcl5074u60ll57jjpe44minrpck44fu1t5x580zty', // Replace with your TinyMCE API key
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat'
  };

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      imageUrl: ['', [Validators.required, this.imageUrlValidator]]
    });
  }

  ngOnInit(): void {
    if (this.selectedRecipe) {
      this.recipeForm.patchValue({
        name: this.selectedRecipe.name,
        details: this.selectedRecipe.details,
        imageUrl: this.selectedRecipe.imageUrl
      });
    }
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const updatedRecipe = {
        ...this.selectedRecipe,
        ...this.recipeForm.value
      };

      this.recipeService.updateRecipe(this.selectedRecipe.id, updatedRecipe).then(() => {
        console.log('Recipe updated!');
      });
    }
  }

  imageUrlValidator(control: AbstractControl): { [key: string]: any } | null {
    const urlRegex = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;
    const valid = urlRegex.test(control.value);
    return valid ? null : { 'invalidUrl': { value: control.value } };
  }
}
