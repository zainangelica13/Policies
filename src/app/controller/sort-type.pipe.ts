import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortType'
})
export class SortTypePipe implements PipeTransform {
  transform(List: Array<any>, sort: string, inOrder: boolean): any {
    if(List) {
      if(inOrder) {
        if(sort == "name") {
          return List.sort((a,b) => a.name < b.name ? -1 * 1 : 1)
        }
        else if(sort == "email") {
          return List.sort((a,b) => a.email < b.email ? -1 * 1 : 1)
        }
        else if(sort == "role") {
          return List.sort((a,b) => a.role < b.role ? -1 * 1 : 1)
        }
      } else {
        if(sort == "name") {
          return List.sort((a,b) => a.name > b.name ? 1 * -1 : 1)
        }
        else if(sort == "email") {
          return List.sort((a,b) => a.email > b.email ? 1 * -1 : 1)
        }
        else if(sort == "role") {
          return List.sort((a,b) => a.role > b.role ? 1 * -1 : 1)
        }
      }
    }
    return List;
  }
}
