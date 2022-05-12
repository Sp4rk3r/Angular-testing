import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todoUrl = 'https://jsonplaceholder.typicode.com/todos/1';

  constructor(private http: HttpClient) {}

  todo$ = this.http.get(this.todoUrl).pipe(tap(console.log));
}
