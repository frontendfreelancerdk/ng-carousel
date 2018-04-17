import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clone'
})
export class ClonePipe implements PipeTransform {

  transform(items: any[], numbers: number): any[] {
    const newArr = items,
      firstItems = [items[0]],
      lastItems = [];
    for (let i = 1, len = items.length; i < len; i++) {
      const cloneItem = items[i];
      lastItems.push(cloneItem);
    }
    // 1,2,3,4,5 => 2,3,4,5,1,2,3,4,5,1
    // 1,2,3,4 => 2,3,4,5,1,2,3,4,1
    console.log(Array.prototype.concat(lastItems, newArr , firstItems));
    return Array.prototype.concat(lastItems, newArr , firstItems);
  }

}
