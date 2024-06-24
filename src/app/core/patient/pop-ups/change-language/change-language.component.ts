import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TranslocoService } from '@ngneat/transloco';
import { languages } from 'src/app/data/languages';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss']
})
export class ChangeLanguageComponent {
  languages = languages
  constructor(private _bottomSheetRef: MatBottomSheetRef<ChangeLanguageComponent>,private translocoService: TranslocoService) {}

  // openLink(event: MouseEvent): void {
  //   this._bottomSheetRef.dismiss();
  //   // this.setLanguage('ar');
  //   event.preventDefault();
  // }
  setLanguage(lang: any) {
    this._bottomSheetRef.dismiss();
    this.translocoService.setActiveLang(lang.code);
    localStorage.setItem('lang', lang.code);
    document.getElementsByTagName('html')[0].setAttribute('dir', lang.direction);
  }

  getLanguage() {
    return this.translocoService.getActiveLang();
  }
}
