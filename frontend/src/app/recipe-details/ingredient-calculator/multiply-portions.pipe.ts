import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplyPortions',
})
export class MultiplyPortionsPipe implements PipeTransform {
  transform(ingredientAmount: number, basePortion: number, currentPortion: number): number {
    const amountForOnePortion = ingredientAmount / basePortion;
    return amountForOnePortion * currentPortion;
  }
}
