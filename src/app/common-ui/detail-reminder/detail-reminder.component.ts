import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Reminder} from '../../models/reminder.model';
import {STATUSES} from '../../models/status.model';
import {ReminderService} from '../../services/remider.service';
import {CalendarComponent} from "../calendar/calendar.component";
import {ClockComponent} from "../clock/clock.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {TaskListEnum} from "../../models/TaskList.Enum";

@Component({
  selector: 'app-detail-reminder',
  templateUrl: './detail-reminder.component.html',
  styleUrls: ['./detail-reminder.component.scss'],
  imports: [
    CalendarComponent,
    ClockComponent,
    NgIf,
    MatButton,
    FormsModule,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    NgForOf,
    DatePipe
  ],
  standalone: true
})
export class DetailReminderComponent implements OnInit {
  reminder!: Reminder;
  statuses = STATUSES;
  reminderId!: number;
  showCalendar = false;
  showClock = false;
  selectedDate!: string;
  activeInput: string = '';
  todo: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private reminderService: ReminderService,
    protected router: Router,

) {

  }



  savedDone: TaskListEnum[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.reminderId = id ? +id : -1;

    if (this.reminderId === -1) {
      this.reminder = new Reminder(0, '', '', null, null, STATUSES[0], []);
    } else {
      const reminder = this.reminderService.getReminder(this.reminderId);
      if (reminder) {
        this.reminder = reminder;
        this.savedDone = this.moveOtherToEnd([...reminder.todolist]);
        this.todo = Object.keys(TaskListEnum)
          .filter(key => !this.savedDone.includes(TaskListEnum[key as keyof typeof TaskListEnum]));
        this.reminderService.updateDoneTasks(reminder.todolist);
      }
    }
    this.reminderService.DoneTasks.subscribe(doneTasks => {
      this.savedDone = this.moveOtherToEnd(doneTasks);
    });
  }


  private moveOtherToEnd(tasks: TaskListEnum[]): TaskListEnum[] {
    return tasks.sort((a, b) => (a === 'другое' ? 1 : b === 'другое' ? -1 : 0));
  }

  onDateInputClick(inputType: string) {
    if (this.activeInput === inputType) {
      this.showCalendar = !this.showCalendar;
      this.showClock = false;
    } else {
      this.activeInput = inputType;
      this.showCalendar = true;
      this.showClock = false;
    }
  }

  onDateSelect(selectedDate: Date) {
    this.selectedDate = selectedDate.toISOString().split('T')[0];
    this.showCalendar = false;
    this.showClock = true;
  }

  onTimeSelect(selectedTime: string) {
    const dateTime = `${this.selectedDate} ${selectedTime}`;
    if (this.activeInput === 'creationDate') {
      this.reminder.creationDate = dateTime;
    } else if (this.activeInput === 'completionDate') {
      this.reminder.completionDate = dateTime;
    }
    this.showClock = false;
  }


  saveReminder() {
    this.reminder.todolist = this.reminderService.getTodoList();
    if (this.reminderId === -1) {
      this.reminder.id = this.reminderService.reminders.length ? Math.max(...this.reminderService.reminders.map(r => r.id)) + 1 : 1;
      this.reminderService.reminders.push(this.reminder);
    } else {
      this.reminderService.updateReminder(this.reminderId, this.reminder);
    }

    this.reminderService.remindersSubject.next(this.reminderService.reminders);
    this.router.navigate(['/reminders']);
  }


  closeCalendar() {
    this.showCalendar = false;
  }

  closeClock() {
    this.showClock = false;
  }
}
