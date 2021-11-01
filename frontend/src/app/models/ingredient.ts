import { Measurement } from './measurement';

export interface Ingredient {
  name: string;
  amount: number;
  measurement?: Measurement;
}
