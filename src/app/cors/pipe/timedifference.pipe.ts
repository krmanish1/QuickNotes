import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timedifference'
})
export class TimeDifferencePipe implements PipeTransform {


  transform(value: string): string {
    // Assuming 'value' is a date string in ISO format
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(value).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    return `${diffDays} days ago`;
  }
}