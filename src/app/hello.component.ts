import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core/lib/translate.service';

@Component({
  selector: 'hello',
  template: `<h1>{{'HELLO' | translate}} {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent {
  @Input() name: string;

  constructor(private translate: TranslateService) {}
}
