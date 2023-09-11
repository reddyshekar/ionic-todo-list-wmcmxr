import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { TodoService } from '../../providers/todo';
import { ArchivedTodosPage } from '../archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;
  public archivedTodosPage = ArchivedTodosPage;

  constructor(private toastController: ToastController, public navCtrl: NavController, private alertController: AlertController, private todoService: TodoService) {
    this.todos = this.todoService.getTodos();
  }

  archiveTodo(todoIndex) {
    this.todoService.archiveTodo(todoIndex);
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
    console.log(this.reorderIsEnabled)
  }

  editTodo(todoIndex) {
    let todo = this.todos[todoIndex];
    let editTodoAlert = this.alertController.create({
      title: 'Edit A Todo',
      message: 'Change Your Todo',
      inputs: [{
        type: 'text',
        name: 'editTodoInput',
        value: todo
      }],
      buttons: [
        {text: 'Cancel'},
        { 
          text: 'Edit todo',
          handler: (inputData) => {
            let todoText = inputData.editTodoInput;
            this.todoService.editTodo(todoIndex, todoText);

            editTodoAlert.onDidDismiss( () => {
              let editTodoToast = this.toastController.create({
                message: 'Todo is edited',
                duration: 2000
              });

              editTodoToast.present();
            });
          }
        }
      ]
    });

    editTodoAlert.present();
  }

  openToDoAlert() {
    let addTodoAlert = this.alertController.create({
      title: 'Add A Todo',
      message: 'Enter Your Todo',
      inputs: [
        {
          type: 'text',
          name: 'addTodoInput'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add todo',
          handler: (inputData) => {
            let todoText = inputData.addTodoInput;
            this.todoService.addTodo(todoText);

            addTodoAlert.onDidDismiss(() => {
              let addTodoToast = this.toastController.create({
                message: 'Todo is added',
                duration: 2000
              });

              addTodoToast.present();
            });



          }
        }
      ]
    });

    addTodoAlert.present();
  }

  itemReordered($event) {

    reorderArray(this.todos, $event);
    console.log($event, this.todos);
  }

}
