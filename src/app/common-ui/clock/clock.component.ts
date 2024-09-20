import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DecimalPipe } from "@angular/common";

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  imports: [DecimalPipe],
  standalone: true
})
export class ClockComponent implements OnInit, OnDestroy {
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private intervalId: any;
  isTimeFixed: boolean = false;

  @Output() timeSelect: EventEmitter<string> = new EventEmitter<string>(); // Эмиттер для передачи времени
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    if (!this.isTimeFixed) {
      const nowTime = new Date();
      this.hours = nowTime.getHours();
      this.minutes = nowTime.getMinutes();
      this.seconds = nowTime.getSeconds();
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateHours(event: any) {
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 23) {
      this.hours = value;
      this.isTimeFixed = true;
    }
  }

  updateMinutes(event: any) {
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 59) {
      this.minutes = value;
      this.isTimeFixed = true;
    }
  }

  updateSeconds(event: any) {
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 59) {
      this.seconds = value;
      this.isTimeFixed = true;
    }
  }

  saveTime() {

    const time =
      `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;

    this.timeSelect.emit(time);

  }

  closeClock() {
    this.close.emit();
  }
}
