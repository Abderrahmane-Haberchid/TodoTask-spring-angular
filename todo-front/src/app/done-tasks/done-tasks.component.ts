import { Component, inject, OnInit } from '@angular/core';
import { TaskServiceService } from '../services/task-service.service';
import { ITask } from '../interfaces/Task.interface';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from "../app.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-done-tasks',
  standalone: true,
  imports: [RouterOutlet, AppComponent, ToastModule],
  templateUrl: './done-tasks.component.html',
  providers: [MessageService],
  styleUrl: './done-tasks.component.css'
})
export class DoneTasksComponent implements OnInit{

  ngOnInit(): void {
    this.service.getAllTasks();
  }
 
  service = inject(TaskServiceService);
  messageService = inject(MessageService);

  handleDelete(task: ITask){
    this.service.deleteTask(task).subscribe({
      next: () => {
        this.showDeleted();
         this.service.getAllTasks();
      },
      error: () => {
        
        console.log(`button clicked ${task.id}`)
      }
    })
  }

  showDeleted(){
      this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Task Deleted!' });
  }
}
