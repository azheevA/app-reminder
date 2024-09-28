import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Location } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import {ReminderService} from "../../services/remider.service";
import {TaskListEnum} from "../../models/TaskList.Enum";
@Component({
  selector: 'app-dragging-todo',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './dragging-todo.component.html',
  styleUrl: './dragging-todo.component.scss'
})
export class DraggingTodoComponent implements OnInit{

  @Output() doneSaved = new EventEmitter<TaskListEnum[]>();
  @Output() closed = new EventEmitter<void>();

  todo:TaskListEnum[] = [];
  done:TaskListEnum[] = [];

  constructor(private location: Location, private reminderService: ReminderService) {}
  goBack(): void {
    this.location.back();
  }
  ngOnInit() {
    this.reminderService.DoneTasks.subscribe((doneTasks: TaskListEnum[]) => {
      this.done = doneTasks;

      this.todo = Object.values(TaskListEnum)
        .filter(task => !this.done.includes(task as TaskListEnum)) as TaskListEnum[];
    });
  }

  saveDone() {
    this.reminderService.updateDoneTasks(this.done);
    this.reminderService.updateTodoList(this.done);
    this.doneSaved.emit(this.done);
    console.log(this.done);
  }


  drop(event: CdkDragDrop<TaskListEnum[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
