// import { Component } from '@angular/core';

// @Component({
//   imports: [],
//   selector: 'app-task-list',
//   styleUrl: './task-list.css',
//   templateUrl: './task-list.html',
// })
// export class TaskList {}


import { Component, OnInit, ChangeDetectorRef   } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  title = '';
  description = '';
  loading = false;
  errorMessage = '';

  constructor(private taskService: TaskService,private cdr: ChangeDetectorRef ) {
    
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  

loadTasks(): void {
  this.loading = true;
  this.errorMessage = '';

  console.log('Loading tasks started');

  this.taskService.getTasks().subscribe({
    next: (tasks) => {
      console.log('API returned tasks:', tasks);

      this.tasks = tasks;
      this.loading = false;
        this.cdr.detectChanges();


      console.log('Loading finished:', this.loading);
      console.log('Task count:', this.tasks.length);
    },
    error: (error) => {
      console.error('Failed to load tasks:', error);

      this.errorMessage = 'Unable to load tasks. Check your backend.';
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}



  addTask(): void {
    const trimmedTitle = this.title.trim();

    if (!trimmedTitle) {
      this.errorMessage = 'Please enter a task title.';
      this.cdr.detectChanges();
      return;
    }

    this.taskService.createTask({
      title: trimmedTitle,
      description: this.description.trim(),
      completed: false
    }).subscribe({
      next: (task) => {
        this.tasks = [...this.tasks, task];
        this.cdr.detectChanges();
        this.title = '';
        this.description = '';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Unable to create task.';
        this.cdr.detectChanges();
      }
    });
  }

  toggleTask(task: Task): void {
    if (!task._id) return;

    this.taskService.updateTask(task._id, {
      completed: !task.completed
    }).subscribe({
      next: (updatedTask) => {
        this.tasks = this.tasks.map((item) =>
          item._id === updatedTask._id ? updatedTask : item
        );
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Unable to update task.';
        this.cdr.detectChanges();
      }
    });
  }

  deleteTask(task: Task): void {
    if (!task._id) return;

    this.taskService.deleteTask(task._id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((item) => item._id !== task._id);
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Unable to delete task.';
        this.cdr.detectChanges();
      }
    });
  }
}

