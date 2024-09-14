# Приложение "Напоминания"
## Простое Angular-приложение для создания, редактирования и управления напоминаниями с указанием дат и статусов.

Технологии

    - Angular (v14+)
    - Angular Material
    - RxJS

## Запуск
`npm start`    
Вы можете установить необходимые зависимости и клонировать проект командой:
`git clone https://github.com/ваш-проект/напоминания.git`
перед этим указав папку через команду `cd`.
### Необходимые зависимости

      npm install -g @angular/cli

      ng add @angular/material

## Описание компонентов
 - DetailReminderComponent — создание и редактирование напоминаний с выбором даты, времени и статуса.
 - ReminderListComponent — список всех напоминаний, поддержка добавления и редактирования.
 - CalendarComponent — редактирование даты и её сохранение в инпут
 - ClockComponent — редактирование времени и её сохранение в инпут с AM и PM.

        *дерево коспонентов программы*
        src/
        ├── app/
        │   ├── components/
        │   │   ├── calendar/
        │   │   ├── clock/
        │   │   ├── detail-reminder/
        │   │   └── reminder-list/
        │   ├── models/
        │   │   ├── reminder.model.ts
        │   │   └── status.model.ts
        │   ├── services/
        │   │   └── reminder.service.ts
        │   ├── ...
        │   ├── app.config.ts
        │   └── app.routes.ts
        ├──...
        ├── assets/
        └── styles.scss

   ## ссылка для связи со мной
   
     моя почта: <sazheev@gmail.com>
