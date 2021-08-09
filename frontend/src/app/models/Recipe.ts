import { ParameterizedIngredient } from './ParamterizedIngredient';

export interface Recipe {
  id?: string;
  title: string;
  author?: string;
  note: string;
  imagesAsBase64: string[];
  portions: number;
  parameterizedIngredients: ParameterizedIngredient[];
  creationDateAsIsoString?: string;
  preparationTimeInMinutes: number;
}
