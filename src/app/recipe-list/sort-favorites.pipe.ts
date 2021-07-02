import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../recipe.service';

@Pipe({
  name: 'sortFavorites',
  pure: false,
})
export class SortFavoritesPipe implements PipeTransform {
  transform(recipes: Recipe[]): Recipe[] {
    return recipes.sort((a, b) => {
      if (a.isFavorite && b.isFavorite) {
        return 0;
      }

      if (a.isFavorite) {
        return -1;
      }

      return 1;
    });
  }
}
