import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-call-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './call-section.component.html',
  styleUrl: './call-section.component.scss'
})
export class CallSectionComponent implements OnInit {
  isLoggedIn: boolean = false;
  isBrowser: boolean = false;
  token: string | null = ''

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.token = localStorage.getItem('token');
      if (this.token) {
        this.isLoggedIn = true
      }else{
        this.isLoggedIn = false
      }
    }
  }

}
