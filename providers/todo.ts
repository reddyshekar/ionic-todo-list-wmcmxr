import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
  private todos = [];
  private archivedTodos = [];

  constructor(public http: Http) {    
  }

  getTodos() {
    return this.todos;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  archiveTodo(todoIndex) {
    let todoToBeArchived = this.todos[todoIndex];
    this.todos.splice(todoIndex, 1);
    this.archivedTodos.push(todoToBeArchived)
  }

  getArchivedTodos() {
    return this.archivedTodos;
  }

  editTodo(todoIndex, todoText) {
    this.todos[todoIndex] = todoText;
  }
}