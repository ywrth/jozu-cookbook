import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class WelcomePageComponent implements OnInit {
  email = '';
  password = '';
  showEmailPasswordLogin = false; // Add this property

  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initWaveAnimation(); // Call the animation initialization when the component is initialized
  }

  initWaveAnimation() {
    const wave1 = "M0 160L50 172.646C100 185.292 200 210.585 300 280.877C400 351.17 500 421.462 600 351.17C700 280.877 800 210.585 900 160.292C1000 110 1100 210.585 1150 260.877L1200 311.154V-40H1150C1100 -40 1000 -40 900 -40C800 -40 700 -40 600 -40C500 -40 400 -40 300 -40C200 -40 100 -40 50 -40H0V160Z",
    wave2 = "M0 200L50 188.096C100 176.19 200 152.381 300 152.381C400 152.381 500 176.19 600 164.286C700 152.381 800 104.762 900 92.857C1000 80.952 1100 104.762 1150 116.667L1200 128.571V-80H1150C1100 -80 1000 -80 900 -80C800 -80 700 -80 600 -80C500 -80 400 -80 300 -80C200 -80 100 -80 50 -80H0V200.306Z",
    wave3 = "M0 200L50 176.19C100 152.381 200 104.762 300 33.334C400 -38.0952 500 -133.333 600 -97.619C700 -61.905 800 104.762 900 128.571C1000 152.381 1100 33.334 1150 -26.1905L1200 -84.286V-80H1150C1100 -80 1000 -80 900 -80C800 -80 700 -80 600 -80C500 -80 400 -80 300 -80C200 -80 100 -80 50 -80H0V200.306Z",
    wave4 = "M0 100L50 72.222C100 44.4444 200 -11.1111 300 44.4444C400 100 500 266.666 600 322.222C700 377.778 800 322.222 900 308.333C1000 294.444 1100 322.222 1150 336.111L1200 350V-80H1150C1100 -80 1000 -80 900 -80C800 -80 700 -80 600 -80C500 -80 400 -80 300 -80C200 -80 100 -80 50 -80H0V100.306Z";
  
    anime({
      targets: '.wave-top > path',
      easing: 'linear',
      duration: 20000,
      loop: true,
      d: [
        { value: [wave1, wave2] },
        { value: wave3 },
        { value: wave4 },
        { value: wave1 },
      ],
    });
  }

  toggleEmailPasswordLogin() {
    this.showEmailPasswordLogin = !this.showEmailPasswordLogin; // Toggle the visibility of email/password login
  }
  
  onGoogleLogin() {
    this.authService.googleSignIn().then(success => {
      if (success) {
        this.router.navigate(['/recipes']);
      } else {
        console.log('Login failed');
      }
    }).catch(error => {
      console.error('Login error:', error);
    });
  }

  onLogin(email: string, password: string) {
    this.authService.signInWithEmail(email, password).then(result => {
      // Handle successful login
    }).catch(error => {
      // Handle login errors
    });
  }
}
