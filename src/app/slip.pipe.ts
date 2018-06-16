import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'slip'
})
export class SlipPipe implements PipeTransform {

  transform (slips: any, filter: string): any {
    if (!slips || !filter || filter === 'all') {
      return slips
    }

    return slips.filter(slip => slip.status === filter)
  }
}
