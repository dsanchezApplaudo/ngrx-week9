export interface ILikeResponse {
  data: [
    {
      id: number;
      user_id: number;
      product_id: number;
      kind: number;
    }
  ];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}
