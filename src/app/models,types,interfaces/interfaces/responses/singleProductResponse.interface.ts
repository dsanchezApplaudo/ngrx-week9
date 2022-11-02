import { Product, ProductBase } from '../../models/product.model';
import { IImage } from '../image.interface';
import { IMeta } from '../meta.interface';

export type SingleProduct = ProductBase & IImage;

export interface ISingleProductResponse {
  data: Product;
  meta: IMeta;
}
