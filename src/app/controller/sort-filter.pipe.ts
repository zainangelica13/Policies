import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortFilter'
})
export class SortFilterPipe implements PipeTransform {
  transform(List: Array<any>, order: string, sort: string): any {
    if(List) {
      if(sort == "Ascending") {
        if(order == "Email") {
          return List.sort((a,b) => a.email.toLowerCase() < b.email.toLowerCase() ? -1 : 1)
        } else if(order == "Amount") {
          return List.sort((a,b) => a.amountInsured - b.amountInsured)
        } else if(order == "Date") {
          return List.sort((a,b) => new Date(a.inceptionDate).getTime() - new Date(b.inceptionDate).getTime())
        }
      } else {
        if(order == "Email") {
          return List.sort((a,b) => a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1)
        } else if(order == "Amount") {
          return List.sort((a,b) => b.amountInsured - a.amountInsured)
        } else if(order == "Date") {
          return List.sort((a,b) => new Date(b.inceptionDate).getTime() - new Date(a.inceptionDate).getTime())
        }
      }
    }
    return List;
  }
}
