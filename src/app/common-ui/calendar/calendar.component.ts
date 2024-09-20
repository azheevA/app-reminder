import {Component, EventEmitter, Output, OnInit, Input} from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ]
})
export class CalendarComponent implements OnInit {
  daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  days: { day: number, otherMonth: boolean }[] = [];
  currentMonth: number = 0; // Январь - 0, Декабрь - 11
  currentYear: number = 2024;
  //dateSelected: boolean = false;
  @Input() selectedDate: Date | null = null;
  @Output() dateSelect: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() close: EventEmitter<void | string> = new EventEmitter<void | string>();

  ngOnInit() {
    const now = new Date();
    this.currentMonth = now.getMonth();
    this.currentYear = now.getFullYear();
    this.generateCalendar();
  }

  generateCalendar() {
    this.days = [];

    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

    const firstDayWeekIndex = firstDayOfMonth.getDay() - 1;
    const daysInMonth = lastDayOfMonth.getDate();

    const lastDayOfPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

    for (let i = firstDayWeekIndex - 1; i >= 0; i--) {
      this.days.push({ day: lastDayOfPrevMonth - i, otherMonth: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      this.days.push({ day, otherMonth: false });
    }

    const remainingDays = 7 - (this.days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        this.days.push({ day: i, otherMonth: true });
      }
    }
  }

  previousMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  selectDay(day: any) {
    if (!day.otherMonth) {
      const selectedDate = new Date(this.currentYear, this.currentMonth, day.day);
      this.dateSelect.emit(selectedDate);
    }
  }

  closeCalendar() {
      this.close.emit();
  }
}
