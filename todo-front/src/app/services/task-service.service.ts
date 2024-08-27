import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ITask } from '../interfaces/Task.interface';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

   http = inject(HttpClient);

   todos = signal<ITask[]>([]);  

   todo = signal<ITask>({
    title: '',
    createdAt: new Date(),
    status: 'Actif',
    priority: 'HIGH',
    id: 0
  });

   doneTasks = signal<ITask[]>([]);
   
  public getAllTasks(){
     return this.http.get<ITask[]>("http://localhost:8080/api/v1/task/all").subscribe(
      {
        next: (res: ITask[]) => {
        this.todos.set(res.filter((t) => t.status === "Actif"))
        this.doneTasks.set(res.filter((t) => t.status === "Done"))
      },
      error: (error) => { console.log(error) }
    });
  }

  public addTask(todo: ITask){
    return this.http.post<ITask>("http://localhost:8080/api/v1/task/add", todo);
  }

  public deleteTask(todo: ITask){
    return this.http.delete(`http://localhost:8080/api/v1/task/delete/${todo.id}`);
  }

  public setToDone(todo: ITask){
    return this.http.put(`http://localhost:8080/api/v1/task/done`, todo);
  }
}
