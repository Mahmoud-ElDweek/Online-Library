import { isPlatformBrowser } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  PLATFORM_ID,
} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { DarkModeService } from "../../services/dark-mode/dark-mode.service";
import { NgClass, NgIf } from "@angular/common";
import { AuthourizationService } from "../../services/users/authourization.service";
import { SubNavbarComponent } from "./sub-navbar/sub-navbar.component";
import { TranslateModule } from "@ngx-translate/core";
import { MyTranslateService } from "../../services/translation/my-translate.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgClass, SubNavbarComponent, TranslateModule],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  username: string = "";
  isDropdownOpen = false;
  isFadeIn = false;
  isFadeOut = false;

  languages: string[] = [
    "English",
    "العربية",
  ];

  token: string | null = "";
  isDarkMode: boolean = false;
  private isBrowser: Boolean = false;
  currentLang: string = "";

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private _darkModeService: DarkModeService,
    private _authorizationService: AuthourizationService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private _myTranslateService: MyTranslateService
  ) {
    //translate
    this.loadLang()


    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.isDarkMode =
        localStorage.getItem("darkMode") === "dark" ? true : false;
    }
    this.getToken();
    this._authorizationService.loggedInUser.subscribe((res) => {
      this.ngZone.run(() => {
        this.isLoggedIn = !!res;
        this.cdr.markForCheck();
      });
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  getToken() {
    if (this.isBrowser) {
      this.token = localStorage.getItem("token");
    }
  }

  toggleDarkMode() {
    this.isFadeOut = true;

    setTimeout(() => {
      this.isDarkMode = !this.isDarkMode;
      this.isFadeOut = false;
      this.isFadeIn = false;

      this.isFadeIn = true;
    }, 400);
    localStorage.setItem("darkMode", this.isDarkMode ? "dark" : "light");
    this._darkModeService.toggleDarkMode(this.isDarkMode ? "dark" : "light");
  }

  logout() {
    this._authorizationService.logOut();
  }







  // translate

  loadLang() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLang = localStorage.getItem('lang');
      if (savedLang) {
        this.currentLang = savedLang;
      }
    }
  }

  toggleLang() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', this.currentLang);
    this.changeLang(this.currentLang);
  }

  changeLang(lang: string) {
    this._myTranslateService.changLang(lang);
  }

}
