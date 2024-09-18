import { Component, EventEmitter, Output } from '@angular/core';
import { MyTranslateService } from '../../services/translation/my-translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone:true,
  imports:[TranslateModule],
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private _myTranslateService:MyTranslateService){}
  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
  changeLang(lang: string) {
    this._myTranslateService.changLang(lang);
  }
}
