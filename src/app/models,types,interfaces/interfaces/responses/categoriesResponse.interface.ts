import { Category } from '../../models/category.model';
import { IMeta } from '../meta.interface';

export interface ICategoryResponse {
  data: Category[];
  meta: IMeta;
}
