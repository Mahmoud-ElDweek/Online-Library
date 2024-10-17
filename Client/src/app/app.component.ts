import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FootbarComponent } from "./components/footbar/footbar.component";
import { ToastComponent } from "./components/toast/toast.component";
import { LoadingService } from "./services/Loading/loading.service";
import { GlobalLoadingComponent } from "./components/global-loading/global-loading.component";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FootbarComponent, ToastComponent, GlobalLoadingComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "Andalosia book store";

  isLoading: boolean = true;
  isScrollTopVisible: boolean = false;

  private isBrowser: Boolean = false;

  constructor(
    private _loadingService: LoadingService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

  }
  ngOnInit() {
    if(this.isBrowser){
      this.checkForLocalStorage()
    }
  }

checkForLocalStorage() {
  this._loadingService.setLoading(true); 

  const lang = localStorage.getItem('lang') || 'en';
  const token = localStorage.getItem('token');

  if (lang === 'ar') {
    document.dir = 'rtl';
  } else {
    document.dir = 'ltr';
  }
  this._loadingService.setLoading(false); 
}
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrollTopVisible = window.scrollY > 500;
  }
  scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
