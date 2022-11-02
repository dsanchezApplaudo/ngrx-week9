import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartItem } from 'src/app/models,types,interfaces/models/cartItem.model';
import { AppState } from 'src/app/store/app.store';
import { AddCartItem } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() name!: string;
  @Input() created!: Date;
  @Input() description!: string;
  @Input() imageUrl: string | undefined;
  @Input() likes!: number;
  @Input() slug!: string;
  @Input() productId!: number;
  @Input() price!: number;
  @Input() stock!: number;
  imageError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  onImgError(event: HTMLImageElement) {
    this.imageError = true;
    event.src = 'assets/images/home/shop.jpg';
  }

  handleClick() {
    this.router.navigate(['/products', this.slug]);
  }

  addToCartClick() {
    const image = this.imageError
      ? 'assets/images/home/shop.jpg'
      : this.imageUrl;
    const cartItem = new CartItem(
      this.name,
      1,
      this.price,
      1,
      this.productId,
      0,
      image as string
    );

    this.store.dispatch(AddCartItem({ payload: cartItem }));
  }
}
