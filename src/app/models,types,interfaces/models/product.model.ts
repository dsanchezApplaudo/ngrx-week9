import { IImage } from '../interfaces/image.interface';
import { Master } from '../interfaces/master.interface';
import { Category } from './category.model';

export class ProductBase {
  constructor(
    public id: number,
    public slug: string,
    public name: string,
    public description: string,
    public active: number,
    public likes_count: number,
    public likes_up_count: number,
    public likes_down_count: number,
    public published_at: Date,
    public image?: { id: number; url: string }
  ) {}
}

export type Product = ProductBase & { master: Master } & IImage & {
    category: Category;
  };
