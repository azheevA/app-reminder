import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReminderListComponent} from "./common-ui/reminder-list/reminder-list.component";
import {DetailReminderComponent} from "./common-ui/detail-reminder/detail-reminder.component";
import {CalendarComponent} from "./common-ui/calendar/calendar.component";

export const routes: Routes = [
  { path: 'reminders', component: ReminderListComponent },
  { path: 'reminder/new', component: DetailReminderComponent },
  { path: 'reminder/:id', component: DetailReminderComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: '', redirectTo: '/reminders', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
