import { ITodo } from './../data/interfaces';
import { action, computed, makeObservable, observable } from "mobx";

class GlobalStore {
  constructor() {
    makeObservable(this);
  }

  @observable isMainBtnsDisabled: boolean = true; // save and discharge btns

  @action setIsMainBtnsDisabled(value: boolean) {
    this.isMainBtnsDisabled = value
  }

  private checkChanges() {
    const savedTasksArr = JSON.parse(localStorage.getItem('tasks') as string) as ITodo[] || [];

    const localTasks = { ...this.todos }
    const savedTasks = { ...savedTasksArr }
    console.log(localTasks, savedTasks)
    if (this.todos.length !== savedTasksArr.length) {
      this.setIsMainBtnsDisabled(false);
    }
    else {
      for (let todo in localTasks) {
        if (localTasks[todo] !== savedTasks[todo]) {
          this.setIsMainBtnsDisabled(false);
          break;
        }
        else this.setIsMainBtnsDisabled(true);
      }
    }
  }

  @observable
  isAddTaskFormOpen: boolean = false;

  @action setIsAddTaskFormOpen() {
    this.isAddTaskFormOpen = !this.isAddTaskFormOpen
  }

  @observable
  token = localStorage.getItem('token');

  @action setToken(token: string) {
    this.token = token;
    this.checkChanges()
  }

  @observable private _todos: ITodo[] = JSON.parse(localStorage.getItem('tasks') as string) || [];

  @action setTodos(todos: ITodo[]) {
    this._todos = todos;
    this.checkChanges()
  }

  findTodo(task: string) {
    const todo = this.todos.find(todo => todo.task === task);
    return todo;
  }

  updateTask(oldtask: ITodo, newTask: ITodo) {
    for (let index = 0; index < this.todos.length; index++) {
      if (this._todos[index].task === oldtask.task) {
        this._todos[index] = newTask;
        break;
      }
    }
    this.checkChanges();
  }

  switch(todosrc: string, todoDestination: string) {
    const index1 = this.todos.findIndex(todo => todo.task === todosrc)
    const index2 = this.todos.findIndex(todo => todo.task === todoDestination)
    const tempTodo = this.todos[index1];
    this.todos[index1] = this.todos[index2];
    this.todos[index2] = tempTodo;

    this.checkChanges();
  }

  @action addTodo(todo: ITodo) {
    this._todos.push(todo);

    this.checkChanges()
  }

  @computed get todos() {
    return this._todos;
  }

  @action deleteTodo(task: string) {
    const filteredTasks = this.todos.filter((todo) => todo.task !== task);
    this.setTodos(filteredTasks);

    this.checkChanges()
  }

}

const globalStore = new GlobalStore();
export default globalStore;