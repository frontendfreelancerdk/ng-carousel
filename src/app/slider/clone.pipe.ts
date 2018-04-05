import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clone'
})
export class ClonePipe implements PipeTransform {

  transform(items: any[], numbers: number): any[] {
    const newArr = items,
      firstItems = [],
      lastItems = [];
    for (let i = 0, len = items.length; i < len; i++) {
      const cloneItem = items[i];
      if (i < (len / 2)){
        firstItems.push(cloneItem);
      } else if(i > (len / 2)){
        lastItems.push(cloneItem);
      }
    }

    //1,2,3,4,5 => 4,5,1,2,3,4,5,1,2,3
    return Array.prototype.concat(lastItems,newArr,firstItems);
  }

}
