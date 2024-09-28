import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {Reminder} from "../../models/reminder.model";
import {ReminderService} from "../../services/remider.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";


@Component({
  selector: 'app-reminder-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatHeaderRowDef,
    DatePipe,
    MatButton,
    NgForOf,
    NgIf,
    HeaderComponent,
    FooterComponent

  ],
  templateUrl: './reminder-list.component.html',
  styleUrl: './reminder-list.component.scss'
})
export class ReminderListComponent implements OnInit {

  reminders: Reminder[] = [];

  reminder!: Reminder;


  constructor(private reminderService: ReminderService, private router: Router) {

  }

  ngOnInit(): void {
    this.reminderService.reminders$.subscribe(data => {
      this.reminders = data;
      console.log(this.reminders)
    });

  }

  onRowClick(index: number): Promise<boolean> {
    return this.router.navigate(['/reminder/', index]);
  }
  addReminder(): void {
    this.router.navigate(['/reminder/new']);
  }


}
