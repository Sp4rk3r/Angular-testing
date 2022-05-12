import { Component, VERSION } from '@angular/core';

import { TodoService } from './todo.service';
import { map, tap } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

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
  param = {value: VERSION.major}

  data$ = this.todoService.todo$.pipe(
    map((x: ToDo) => ({
      ...x,
      title: x.title + ' and more',
    })),
    tap((x) => {
      console.log(x);
    })
  );

  constructor(private todoService: TodoService) {
        
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
