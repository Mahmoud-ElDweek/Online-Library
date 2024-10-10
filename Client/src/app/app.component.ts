import { Component, HostListener, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FootbarComponent } from "./components/footbar/footbar.component";
import { ToastComponent } from "./components/toast/toast.component";
import { LoadingService } from "./services/Loading/loading.service";
import { GlobalLoadingComponent } from "./components/global-loading/global-loading.component";

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


  constructor(private _loadingService: LoadingService) {}
  ngOnInit() {
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
