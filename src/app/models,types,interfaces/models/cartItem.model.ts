export class CartItem {
  constructor(
    public name: string,
    public quantity: number,
    public price: number,
    public total: number,
    public product_id: number,
    public product_variant_id: number,
    public imageUrl: string
  ) {}
}
