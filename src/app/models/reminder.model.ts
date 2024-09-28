import { Status } from './status.model';
import {TaskListEnum} from "./TaskList.Enum";

export class Reminder {
  constructor(
    public id: number,
    public shortDescription: string,
    public fullDescription: string,
    public creationDate:  Date  | string | undefined | null,
    public completionDate: Date | string  | undefined | null,
    public status: Status,
    public todolist:TaskListEnum[]
  ) {}
}
