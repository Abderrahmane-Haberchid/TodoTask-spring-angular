
import { Routes } from '@angular/router';
import { DoneTasksComponent } from './done-tasks/done-tasks.component';
import { TodolistComponent } from './todolist/todolist.component';

export const routes: Routes = [
    { path: 'done', component: DoneTasksComponent, title: 'Done Tasks' },
    { path: 'home', component: TodolistComponent, title: 'Home Page' },
    { path: '', component: TodolistComponent, title: 'Home Page' },
];
