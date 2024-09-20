import { Injectable } from '@angular/core';

import { STATUSES } from '../models/status.model';
import { BehaviorSubject } from 'rxjs';
import {Reminder} from "../models/reminder.model";

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  public reminders: Reminder[] = [

    new Reminder(1,'Купить молоко', 'Купить молоко в магазине на углу',
      new Date('2024-09-04T09:45:00'), null, STATUSES[1]),
    new Reminder(2,'Записаться к врачу', 'Записаться на приём к терапевту',
      new Date('2024-09-07T12:30:00'), new Date('2024-09-07T18:00:00'), STATUSES[2]),
    new Reminder(3,'дела по дому', 'убраться в комнате и помыть посуду',
      new Date('2024-09-09T15:45:00'), null, STATUSES[3]),
    new Reminder(4,'Накормить собаку', 'Еcли будет лаять - погладить',
      new Date('2024-09-09T16:00:00'), null, STATUSES[3]),
    new Reminder(5,'сходить в магазин',
      'купить морковь, картошку, репчетый лук, молоко, куриную грудку.',
      new Date('2024-09-12T14:00:00'),  new Date('2024-09-12T16:00:00'), STATUSES[1]),
    new Reminder(6,'генеральная уборка',
      'Необходимо убраться на кухне и прихожке, а также убрать пыль с полок',
      new Date('2024-09-15T15:30:00'), new Date('2024-09-15T17:00:00'), STATUSES[2]),
    new Reminder(7,'Почистить компьютер',
      'Почиситить все комплектующие, а также сменить термопасту у процессора и термопрокладки, если это необходимо',
      new Date('2024-09-16T10:00:00'), new Date('2024-09-16T12:00:00'), STATUSES[2]),
    new Reminder(8,'Почистить ванну',
      'Необходимо также проверить наличие шампуня и геля для душа, а также прочисить от волос сливную трубу',
      null, null, STATUSES[2]),

  ];

  remindersSubject = new BehaviorSubject<Reminder[]>(this.reminders);
  reminders$ = this.remindersSubject.asObservable();

  getReminder(id: number): Reminder | undefined {
    return this.reminders[id];
  }

  updateReminder(id: number, updatedReminder: Reminder): void {
    const index = this.reminders.findIndex(reminder => reminder.id === id);
    if (index !== -1) {
      this.reminders[index] = updatedReminder;
      this.remindersSubject.next(this.reminders);
    }
  }



}
