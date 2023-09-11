import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TodoService } from '../../providers/todo';

@Component({
  selector: 'page-archived-todos',
  templateUrl: 'archived-todos.html'
})
export class ArchivedTodosPage {
  public archivedTodos = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private todoService: TodoService) {    
  }

  ionViewDidLoad() {
    this.archivedTodos = this.todoService.getArchivedTodos();
  }

}