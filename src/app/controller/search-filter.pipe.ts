import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(List: Array<any>, search: string, type: string): any {
    if(List) {
      if(type == "policies") {
        return List.filter(d => d.id.indexOf(search)>-1 || d.email.indexOf(search)>-1 || d.amountInsured.toString().indexOf(Number(search))>-1 || d.inceptionDate.indexOf(search)>-1);
      } else if (type == "clients") {
        return List.filter(d => d.id.indexOf(search)>-1 || d.email.indexOf(search)>-1 || d.role.indexOf(search)>-1);
      }
    }
    return List;
  }
}
