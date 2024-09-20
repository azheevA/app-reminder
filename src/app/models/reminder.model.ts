import { Status } from './status.model';

export class Reminder {
  constructor(
    public id: number,
    public shortDescription: string,
    public fullDescription: string,
    public creationDate:  Date  | string | undefined | null,
    public completionDate: Date | string  | undefined | null,
    public status: Status
  ) {}
}
