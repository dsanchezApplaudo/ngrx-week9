import { Product } from '../../models/product.model';
import { IImage } from '../image.interface';
import { IMeta } from '../meta.interface';

export interface IProductsResponse {
  data: Product[];
  meta: IMeta;
}
