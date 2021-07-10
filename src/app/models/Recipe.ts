import { Difficulty } from './difficulty';
import { ParameterizedIngredient } from './ParamterizedIngredient';

export interface Recipe {
  id?: string;
  title: string;
  author?: string;
  note: string;
  imagesAsBase64: string[];
  isFavorite: boolean;
  portions: number;
  parameterizedIngredients: ParameterizedIngredient[];
  creationDateAsIsoString?: string;
  difficulty?: Difficulty;
  preparationTimeInMinutes: number;
}
