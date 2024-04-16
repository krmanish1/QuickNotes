import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;

    const date = new Date(value);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Format hours to 12-hour format and add AM/PM
    const formattedHours = hours % 12 || 12;
    const period = hours < 12 ? 'AM' : 'PM';

    // Format minutes to two digits
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Get the day of the week
    const formattedDay = days[day];

    return `${formattedHours}:${formattedMinutes} ${period}, ${formattedDay}`;
  }

}
