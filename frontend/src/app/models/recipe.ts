import { Ingredient } from './ingredient';

export interface Recipe {
  _id: string;
  userId: string;
  title: string;
  note: string;
  thumbnailAsBase64: string;
  imageIds: string[];
  portions?: number;
  ingredients: Ingredient[];
  preparationTimeInMinutes: number;
  dateCreatedAsISOString: string;
  dateUpdatedAsISOString?: string;
  isPublic?: boolean;
}
