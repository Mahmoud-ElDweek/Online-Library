import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { StreamInterface } from '../../interfaces/streamEvent.interface';
import { AllStreamEventService } from '../../services/stream-event/all-stream-event.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SubNavbarComponent } from "../../components/navbar/sub-navbar/sub-navbar.component";
import { MyTranslateService } from '../../services/translation/my-translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-stream-event',
  standalone: true,
  imports: [SubNavbarComponent, TranslateModule],
  templateUrl: './stream-event.component.html',
  styleUrls: ['./stream-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush  // استخدام OnPush لتحسين الأداء
})
export class StreamEventComponent implements OnInit {
  allOldStreams: Array<StreamInterface> = [];
  page: number = 1;
  limit: number = 5;
  currentStream: StreamInterface | null = null;

  constructor(
    private _allStreamEventService: AllStreamEventService,
    private _domSanitizer: DomSanitizer,
    private _myTranslateService: MyTranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllOldStreams();
  }

  getAllOldStreams() {
    this._allStreamEventService.getAllOldStreams(this.page, this.limit).subscribe({
      next: (res) => {
        this.allOldStreams = res.data;
        if (this.allOldStreams.length > 0) {
          this.currentStream = this.allOldStreams[this.allOldStreams.length - 1];
        }
        this.cdr.markForCheck(); 
        console.log(res, "dataaaaaaaaa");
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Success, Got All Old Streams");
      }
    });
  }

  onStreamSelect(stream: StreamInterface): void {
    this.currentStream = stream;
    this.cdr.markForCheck();
  }

  getSanitizedUrl(streamUrlCode: any): SafeResourceUrl {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${streamUrlCode}`);
  }

  getSanitizedChatUrl(streamUrlCode: any): SafeResourceUrl {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/live_chat?v=${streamUrlCode}&embed_domain=andalosia.vercel.app`
    );
  }

  getThumbnailUrl(streamUrlCode: string): string {
    return `https://img.youtube.com/vi/${streamUrlCode}/maxresdefault.jpg`;
  }

  changeLang(lang: string) {
    this._myTranslateService.changLang(lang);
  }
}
