import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MyTranslateService } from '../../services/translation/my-translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-call-section',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './call-section.component.html',
  styleUrl: './call-section.component.scss'
})
export class CallSectionComponent {
  constructor(private _myTranslateService:MyTranslateService){ }
  changeLang(lang: string) {
    this._myTranslateService.changLang(lang);
  }
}
