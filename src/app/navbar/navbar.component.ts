import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service'; // Adjust the path as necessary
import * as anime from 'animejs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showNavbar = false;

  ngOninit(): void {
    this.initWaveAnimation();
  }
  initWaveAnimation() {
    const wave1 = "M0 140L50 152.646C100 165.292 200 190.585 300 260.877C400 331.17 500 401.462 600 331.17C700 260.877 800 190.585 900 140.292C1000 90 1100 190.585 1150 240.877L1200 291.154V-40H1150C1100 -40 1000 -40 900 -40C800 -40 700 -40 600 -40C500 -40 400 -40 300 -40C200 -40 100 -40 50 -40H0V140Z",
    wave2 = "M0 180L50 176.096C100 172.19 200 162.381 300 162.381C400 162.381 500 172.19 600 170.286C700 168.381 800 134.762 900 132.857C1000 130.952 1100 152.762 1150 156.667L1200 160.571V-80H1150C1100 -80 1000 -80 900 -80C800 -80 700 -80 600 -80C500 -80 400 -80 300 -80C200 -80 100 -80 50 -80H0V180.306Z",
    wave3 = "M0 190L50 176.19C100 162.381 200 124.762 300 73.334C400 22.0952 500 -53.333 600 -37.619C700 -21.905 800 114.762 900 128.571C1000 142.381 1100 43.334 1150 4.1905L1200 0V-80H1150C1100 -80 1000 -80 900 -80C800 -80 700 -80 600 -80C500 -80 400 -80 300 -80C200 -80 100 -80 50 -80H0V190.306Z",    
    wave4 = "M0 90L50 82.222C100 74.4444 200 48.8889 300 74.4444C400 100 500 216.666 600 262.222C700 307.778 800 262.222 900 258.333C1000 254.444 1100 272.222 1150 276.111L1200 280V-80H1150C1100 -80 1000 -80 900 -80C800 -80 700 -80 600 -80C500 -80 400 -80 300 -80C200 -80 100 -80 50 -80H0V90.306Z";

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
  
  constructor(
    private router: Router, 
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService // Inject AuthService
  ) {
    this.authService.user$.subscribe(user => {
      this.showNavbar = !!user; // Show navbar only if user is logged in
      this.changeDetectorRef.detectChanges(); // Trigger change detection
    });

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Additional logic if needed based on router events
    });
  }     
  ngOnInit(): void {
  }
  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/welcome-page']);
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  }
      }
