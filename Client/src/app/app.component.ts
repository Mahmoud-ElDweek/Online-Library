import { Component, HostListener } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FootbarComponent } from "./components/footbar/footbar.component";
import { ToastComponent } from "./components/toast/toast.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FootbarComponent, ToastComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "Andalosia book store";


  isScrollTopVisible: boolean = false;

  // Scroll event listener
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrollTopVisible = window.scrollY > 500;
  }
  scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
