import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1 [translate]="'HELLO'" [translateParams]="{value: name }"> 
  </h1><span><h1>{{name}}!</h1></span>
    <h1 translate [translateParams]="{value: name}">HELLO</h1>
  
  `,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent {
  @Input() name: string;

  constructor() {}

  //<div translate [translateParams]="{value: 'world'}">HELLO</div>
  //<div [translate]="'HELLO'" [translateParams]="{value: 'world'}"></div>

  // Inside Json
  // "HELLO": "Welcome to my Angular application!<br><strong>This is an amazing app which uses the latest technologies!</strong>"
  // -> render them: <div [innerHTML]="'HELLO' | translate"></div>
}
