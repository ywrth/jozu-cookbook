import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { User as CustomUser } from 'firebase/auth';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  isAuthenticated = false;
  authState$: Observable<CustomUser | null>;
  currentUrl: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.authState$ = this.afAuth.authState as Observable<CustomUser | null>;
  }

  ngOnInit() {
    // Subscribe to auth state changes
    this.authState$.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log('User authenticated:', this.isAuthenticated);
      if (user) {
        this.router.navigate(['/recipes']).finally(() => this.isLoading = false);
      } else {
        this.router.navigate(['/welcome-page']).finally(() => this.isLoading = false);
      }
    });

    // Subscribe to Router events
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url; // Update the current URL
    });
  }

  ngOnDestroy(): void {
    // Implement any necessary cleanup logic
  }

  onAddRecipeClick() {
    console.log('Add Recipe button clicked');
    this.router.navigate(['/add-recipe']);
  }

  onLogoutClick() {
    console.log('Logout button clicked');
    this.logout();
  }

  onRecipesClick() {
    console.log('Recipes button clicked');
    this.router.navigate(['/recipes']);
  }

  private logout() {
    this.afAuth.signOut().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/welcome-page']);
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  }
}
