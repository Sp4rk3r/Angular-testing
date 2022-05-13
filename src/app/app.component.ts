import { Component, VERSION } from '@angular/core';

import { TodoService } from './todo.service';
import { map, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as data from '../assets/data.json';

interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Test {
  prijs: number;
  id: number;
  totaal: number;
  comment: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  param = { value: VERSION.major };
  private _jsonUrl = './assets/data.json';
  language: string;
  rekening: Test[];
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //   }),
  //   responseType: 'json',
  // };

  // Test language in typescript
  data$ = this.todoService.todo$.pipe(
    map((x: ToDo) => ({
      ...x,
      title: x.title + ' and more',
    })),
    tap((x) => {
      console.log(x);
    })
  );

  // price$ = data.pipe(
  //   map((x: Test[]) => ({
  //     ...x,
  //     forEach(item: Test) {
  //       item.totaal += item.prijs;
  //     },
  //   })),
  //   tap((x) => {
  //     console.log(x);
  //   })
  // );

  constructor(
    private todoService: TodoService,
    private translate: TranslateService,
    private http: HttpClient
  ) {
    translate.setDefaultLang('en');
    console.log(data);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
    this.language = translate.currentLang;
  }

  changeLanguage(language: string) {
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    this.language = this.translate.currentLang;
  }

  public getJSOn(): Observable<Test[]> {
    var test = this.http.get<any>(this._jsonUrl);
    test.subscribe((data) => {
      console.log(data);
    });
    console.log(test);
    // fetch('./assets/data.json').then(res => res.json())
    // .then(jsonData => {
    //   console.log(jsonData, 'test')
    // });
    return this.http.get<any>(this._jsonUrl);
  }

  // Result without ...x
  // ===================
  // title: "delectus aut autem and more"
  //__proto__: Object
  // only modify variable and array only exist with 'Title'
  // Result with ...x
  // ================
  // completed: false
  // id: 1
  // title: "delectus aut autem and more"
  // userId: 1
  // __proto__: Object
  // Copy the entire array and modify specific variable
}
