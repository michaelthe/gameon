import {Pipe, PipeTransform} from '@angular/core'
import {Slip} from './api.service';

@Pipe({
  name: 'slipFilter'
})
export class SlipFilterPipe implements PipeTransform {

  transform(slips: Slip[], filter: string): Slip[] {
    if (!slips || !filter || filter === 'all') {
      return slips
    }

    return slips.filter(slip => slip.status === filter)
  }
}
