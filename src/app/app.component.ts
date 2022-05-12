import { Component, VERSION } from '@angular/core';

import { TodoService } from './todo.service';
import { map, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  param = { value: VERSION.major };
  language: string;

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

  constructor(
    private todoService: TodoService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
    this.language = translate.currentLang
  }

  changeLanguage(language: string) {
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    this.language = this.translate.currentLang
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
