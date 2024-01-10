import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router'; // Import Router
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AbstractControl } from '@angular/forms';

export function imageUrlValidator(): Validators {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const urlRegex = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg|webp)(\?.*)?$)/i;
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
  public editorStyle = {};


  editorConfig = {
    apiKey: 'gioa3daqcl5074u60ll57jjpe44minrpck44fu1t5x580zty', // Replace with your TinyMCE API key
    plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount autoresize',
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
  };
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustEditorHeight();
  }

  adjustEditorHeight() {
    const headerHeight = 150; // Example, replace with your header's height
    const footerHeight = 150; // Example, replace with your footer's height
    const otherElementsHeight = 100; // Total height of other elements above/below the editor
  
    const availableHeight = window.innerHeight - headerHeight - footerHeight - otherElementsHeight;
  
    // Set the dynamic style
    this.editorStyle = { height: `${availableHeight}px` };
  }
    

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router // Inject Router
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      imageUrl: ['', imageUrlValidator()], // Use the imageUrlValidator here
    });
  }


  ngOnInit(): void {
    this.adjustEditorHeight();
  }

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
