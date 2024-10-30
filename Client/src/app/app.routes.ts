
import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { BooksComponent } from "./pages/books/books.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { Err404Component } from "./pages/err404/err404.component";
import { AuthorsComponent } from "./pages/authors/authors.component";
import { AccountSettingComponent } from "./components/account-setting/account-setting.component";
import { BooksGridListComponent } from "./components/books-grid-list/books-grid-list.component";
import { BooksListComponent } from "./components/books-list/books-list.component";
import { SecuritySettingComponent } from "./components/security-setting/security-setting.component";
import { MyOrdersComponent } from "./pages/my-orders/my-orders.component";
import { authGuard } from "./guard/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "about",
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: "contact",
    canActivate: [authGuard],
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),

  },
  {
    path: "payment", 
    canActivate: [authGuard],
    loadComponent: () => import('./pages/payment/payment.component').then(m => m.PaymentComponent),
  },
  {
    path: "book-details/:id",
    loadComponent: () => import('./pages/book-details/book-details.component').then(m => m.BookDetailsComponent),
  },
  {
    path: "books",
    component: BooksComponent,
    children: [
      {
        path: "",
        redirectTo: "grid",
        pathMatch: "full",
      },
      {
        path: "grid",
        component: BooksGridListComponent,
      },
      {
        path: "list",
        component: BooksListComponent,
      },
    ],
  },
  
  {
    path: "cart",
    canActivate: [authGuard],
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
  },
  {
    path: "wishlist",
    canActivate: [authGuard],
    loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent),
  },
  {
    path: "recommendation",
    canActivate: [authGuard],
    loadComponent: () => import('./pages/recommendation/recommendation.component').then(m => m.RecommendationComponent),
  },
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "user-settings",
    canActivate: [authGuard],
    loadComponent: () => import('./pages/user-settings/user-settings.component').then(m => m.UserSettingsComponent),
    children: [
      { path: "", redirectTo: "account", pathMatch: "full" },
      { path: "account", component: AccountSettingComponent },
      { path: "security", component: SecuritySettingComponent },
      { path: "my-orders", component: MyOrdersComponent },
    ],
  },
  {
    path: "verify-email",
    loadComponent: () => import('./pages/email-Verified/email-verified/email-verified.component').then(m => m.EmailVerifiedComponent),
  },

  {
    path: "forgot-password",
    loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },
  {
    path: "reset-password",
    loadComponent: () => import('./pages/reset-password/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
  },
  {
    path: "authors",
    component: AuthorsComponent,
  },
  {
    path: "authors/:id",
    loadComponent: () => import('./pages/author-details/author-details.component').then(m => m.AuthorDetailsComponent),
  },
  {
    path: "streaming",
    canActivate: [authGuard],
    loadComponent: () => import('./pages/stream-event/stream-event.component').then(m => m.StreamEventComponent),
  },
  {
    path: "**",
    component: Err404Component,
  },
];
