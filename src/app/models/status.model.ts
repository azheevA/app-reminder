export class Status {
  constructor(public name: string) {}
}

export const STATUSES: Status[] = [
  new Status('Новый'),
  new Status('Исполнен'),
  new Status('Запланирован'),
  new Status('Просрочен')
];
