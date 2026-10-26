import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskList } from './components/task-list/task-list';

@Component({
   selector: 'app-root',
  standalone: true,
  imports: [TaskList],
  template: '<app-task-list />',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}




