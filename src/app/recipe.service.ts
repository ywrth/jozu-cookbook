import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private firestore: AngularFirestore) { }

  addRecipe(recipe: any) {
    return this.firestore.collection('recipes').add(recipe);
  }

  getRecipeById(id: string): Observable<any> {
    return this.firestore.collection('recipes').doc(id).valueChanges();
  }

  updateRecipe(id: string, recipeData: any): Promise<void> {
    return this.firestore.collection('recipes').doc(id).update(recipeData);
}

getAllRecipes(): Observable<any[]> {
  return this.firestore.collection('recipes').snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
}
}
