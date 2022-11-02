import { Kind } from '../../types/kind.types';

export interface ILikesRequest {
  data: {
    product_id: number;
    king: Kind;
  };
}
