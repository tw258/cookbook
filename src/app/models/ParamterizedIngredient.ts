import { Measurement } from './measurement';

export interface ParameterizedIngredient {
  amount: number;
  measurement?: Measurement;
  ingredient: string;
}
