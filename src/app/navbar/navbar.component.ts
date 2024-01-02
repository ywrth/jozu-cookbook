import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  ngAfterViewInit() {
    $(document).ready(function () {
      var str = '#len'; // Increment by 1 up to 1-nelemnts
      var i: number = 1; // Explicitly declare the type as 'number'
      var stop: number = 4; // Explicitly declare the type as 'number'

      setInterval(function () {
        if (i > stop) {
          return;
        }
        $('#len' + (i++)).toggleClass('bounce');
      }, 500);
    });
  }
}
