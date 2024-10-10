import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../services/Loading/loading.service';

@Component({
  selector: 'app-global-loading',
  standalone: true,
  imports: [NgIf,CommonModule],
  templateUrl: './global-loading.component.html',
  styleUrl: './global-loading.component.scss'
})
export class GlobalLoadingComponent {
  isLoading = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
