import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss']
})
export class RecipeModalComponent {
  @Input() set showModal(value: boolean) {
    if (value && !this._showModal) {
      window.history.pushState(null, '', window.location.href); // Add history entry only when opening
    }
    this._showModal = value;
  }
  get showModal(): boolean {
    return this._showModal;
  }
  private _showModal = false;

  @Input() selectedRecipe: any;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() recipeUpdatedEvent = new EventEmitter<boolean>(); 
  @Output() recipeDeletedEvent = new EventEmitter<string>();
  @ViewChild('editor') editorElement!: ElementRef;

  showEditForm = false;

  constructor(private recipeService: RecipeService, private router: Router, private cdr: ChangeDetectorRef) {}
  toggleEdit() {
    this.showEditForm = !this.showEditForm;

    if (this.showEditForm) {
      // Manually trigger change detection
      this.cdr.detectChanges();

      // Then scroll into view
      setTimeout(() => {
        if (this.editorElement) {
          this.editorElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // You can adjust this timeout as needed
    }
  }


  onRecipeUpdated() {
    this.showEditForm = false; // Hide the edit form on update
    this.closeModal();
    this.recipeUpdatedEvent.emit(true); // Emit an event to notify successful update
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.showEditForm = false; // Reset the edit form state
    this.closeModalEvent.emit(false);
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