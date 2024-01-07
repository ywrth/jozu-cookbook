import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  showSuccessMessage: boolean | undefined;

  constructor(private authService: AuthService) { }

  onSignup() {
    // Call the AuthService to register the user
    this.authService
      .signUpWithEmail(this.name, this.email, this.password)
      .then(() => {
        // Handle successful registration
        this.showSuccessMessage = true; // Display success message
        setTimeout(() => {
          this.showSuccessMessage = false; // Hide success message after 3 seconds (adjust as needed)
        }, 3000);
      })
      .catch((error) => {
        // Handle registration error
        console.error('Registration error:', error);
      });
  }
}