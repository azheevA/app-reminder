import {Injectable} from '@angular/core';

import {STATUSES} from '../models/status.model';
import {BehaviorSubject} from 'rxjs';
import {Reminder} from "../models/reminder.model";
import {TaskListEnum, TaskListEnum as T} from "../models/TaskList.Enum";

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  public reminders: Reminder[] = [

    new Reminder(1,'Купить молоко', 'Купить молоко в магазине на углу',
      new Date('2024-09-04T09:45:00'), null, STATUSES[1],[T.Task1, T.Task2]),
    new Reminder(2,'Записаться к врачу', 'Записаться на приём к терапевту',
      new Date('2024-09-07T12:30:00'), new Date('2024-09-07T18:00:00'), STATUSES[2],[T.Task4, T.Task6]),
    new Reminder(3,'дела по дому', 'убраться в комнате и помыть посуду',
      new Date('2024-09-09T15:45:00'), null, STATUSES[3],[T.Task5, T.Task2]),
    new Reminder(4,'Накормить собаку', 'Еcли будет лаять - погладить',
      new Date('2024-09-09T16:00:00'), null, STATUSES[3],[T.Task7, T.Task2]),
    new Reminder(5,'сходить в магазин',
      'купить морковь, картошку, репчятый лук, молоко, куриную грудку.',
      new Date('2024-09-12T14:00:00'),  new Date('2024-09-12T16:00:00'), STATUSES[1],[T.Task9, T.Task2]),
    new Reminder(6,'генеральная уборка',
      'Необходимо убраться на кухне и прихожке, а также убрать пыль с полок',
      new Date('2024-09-15T15:30:00'), new Date('2024-09-15T17:00:00'), STATUSES[2],[T.Task2, T.Task3]),
    new Reminder(7,'Почистить компьютер',
      'Почиситить все комплектующие, а также сменить термопасту у процессора и термопрокладки, если это необходимо',
      new Date('2024-09-16T10:00:00'), new Date('2024-09-16T12:00:00'), STATUSES[2],[T.Task1, T.Task2]),
    new Reminder(8,'Почистить ванну',
      'Необходимо также проверить наличие шампуня и геля для душа, а также прочисить от волос сливную трубу',
      null, null, STATUSES[2],[T.Task1, T.Task2]),
    new Reminder(9,'Пройти бездну',
      '',
      null, null, STATUSES[2],[T.Task1, T.Task2]),

  ];

  remindersSubject = new BehaviorSubject<Reminder[]>(this.reminders);
  reminders$ = this.remindersSubject.asObservable();

  private doneTasksSource = new BehaviorSubject<TaskListEnum[]>([]);
  private todoListSource = new BehaviorSubject<TaskListEnum[]>([]);

  DoneTasks = this.doneTasksSource.asObservable();

  updateDoneTasks(doneTasks: TaskListEnum[]) {
    this.doneTasksSource.next(doneTasks);
  }
  getReminder(id: number): Reminder | undefined {
    return this.reminders[id];
  }
  updateTodoList(todoList: TaskListEnum[]) {
    this.todoListSource.next(todoList);
    this.updateDoneTasks(todoList);
  }


  getTodoList(): TaskListEnum[] {
    return this.todoListSource.value;
  }
  getDoneTasks(): TaskListEnum[] {
    return this.doneTasksSource.value;
  }

  updateReminder(id: number, updatedReminder: Reminder): void {
    const index = this.reminders.findIndex(reminder => reminder.id === id);
    if (index !== -1) {
      this.reminders[index] = updatedReminder;
      this.remindersSubject.next(this.reminders);
    }
  }
}
