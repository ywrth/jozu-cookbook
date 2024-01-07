import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState; // Assign the Firebase auth state to it
  }

  // Additional method to get current user state
  getCurrentUser(): Promise<firebase.User | null> {
    return this.afAuth.currentUser;
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  async googleSignIn(): Promise<boolean> {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await this.afAuth.signInWithPopup(provider);
      return true; // Login successful
    } catch (error) {
      console.error('Google sign-in error:', error);
      return false; // Login failed
    }
  }

  signInWithEmail(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signUpWithEmail(name: string, email: string, password: string): Promise<any> {
    // Create a user with email, password, and displayName
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return userCredential.user?.updateProfile({
      displayName: name,
    });
}
}
