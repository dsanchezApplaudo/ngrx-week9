export interface ICartItemsToOrder {
  product_variant_id: number;
  quantity: number;
}

export interface ICartRequest {
  data: {
    items: ICartItemsToOrder[];
  };
}
