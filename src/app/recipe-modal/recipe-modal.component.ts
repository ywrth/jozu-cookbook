import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss']
})
export class RecipeModalComponent {
  @Input() showModal: boolean = false;
  @Input() selectedRecipe: any;

  @Output() closeModalEvent = new EventEmitter<boolean>();

  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit(false); // Emitting a boolean value
  }
}