import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showAddRecipeModalSource = new BehaviorSubject<boolean>(false);
  showAddRecipeModal$ = this.showAddRecipeModalSource.asObservable();

  openAddRecipeModal() {
    this.showAddRecipeModalSource.next(true);
  }

  closeAddRecipeModal() {
    this.showAddRecipeModalSource.next(false);
  }
}
