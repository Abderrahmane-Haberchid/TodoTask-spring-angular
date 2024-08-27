import { FormsModule} from '@angular/forms';
import { Component, inject, OnInit, signal} from '@angular/core';
import { TaskServiceService } from '../services/task-service.service';
import { ITask } from '../interfaces/Task.interface';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FormsModule, RouterOutlet, ToastModule, ],
  templateUrl: './todolist.component.html',
  providers: [MessageService],
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit{

  service = inject(TaskServiceService)
  messageService = inject(MessageService)

  showError = signal<string>('')

  ngOnInit(): void {
    this.service.getAllTasks();
   
  }

  handleAdd(){
    this.service.addTask(this.service.todo()).subscribe({
      next: () => {
        this.showSuccess()
        this.service.getAllTasks();
      }
    })
}
handleDelete(task: ITask){
  this.service.deleteTask(task).subscribe({
    next: () => {
      this.service.getAllTasks();
       this.showDelete()
    },
    error: () => {
      console.log(`button clicked ${task.id}`)
    }
  })
}

handleDoneUpdate(todo: ITask){
  this.service.setToDone(todo).subscribe({
    next: (res) => {
      this.showSuccess();
      this.service.getAllTasks();
    },
    error: () => {
      this.showError.set('notDone')
    }
  })
}

showSuccess() {
  this.messageService.add({ severity: 'contrast', summary: 'Success', detail: 'Task added to you list!' });
}
showDelete() {
  this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Task Deleted!' });
}

}
