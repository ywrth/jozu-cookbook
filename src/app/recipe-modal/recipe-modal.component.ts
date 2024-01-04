import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss']
})
export class RecipeModalComponent {
  @Input() showModal: boolean = false;
  @Input() selectedRecipe: any;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() recipeUpdatedEvent = new EventEmitter<boolean>(); // Event for recipe update
  @Output() recipeDeletedEvent = new EventEmitter<string>(); // Event for recipe deletion

  constructor(private recipeService: RecipeService) {}

  onRecipeUpdated() {
    this.closeModal();
    this.recipeUpdatedEvent.emit(true); // Emit an event to notify successful update
  }

  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit(false); // Emitting a boolean value to close the modal
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) { // Check if the click is on the backdrop
      this.closeModal();
    }
  }

  deleteRecipe(recipeId: string | undefined) {
    if (!recipeId) {
        return; // Handle the case when recipeId is undefined or null
    }

    // Add confirmation dialog (optional)
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (confirmDelete) {
      this.recipeService.deleteRecipe(recipeId).then(() => {
        this.recipeDeletedEvent.emit(recipeId); // Emit the deleted recipe ID
        this.closeModal();
      }).catch(error => {
        console.error('Error deleting recipe:', error);
        // Handle error (e.g., show an error message)
      });
    }
  }
}