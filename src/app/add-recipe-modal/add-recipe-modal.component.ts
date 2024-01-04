import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-add-recipe-modal',
  standalone: true,
  imports: [],
  templateUrl: './add-recipe-modal.component.html',
  styleUrl: './add-recipe-modal.component.scss'
})
export class AddRecipeModalComponent {
  @Input() showModal = false;

  closeModal() {
    this.showModal = false;
  }

}
