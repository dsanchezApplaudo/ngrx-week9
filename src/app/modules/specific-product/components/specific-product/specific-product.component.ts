import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, map, of, switchMap } from 'rxjs';
import { CartItem } from 'src/app/models,types,interfaces/models/cartItem.model';
import { Product } from 'src/app/models,types,interfaces/models/product.model';
import { Kind } from 'src/app/models,types,interfaces/types/kind.types';
import { LikeHttpService } from 'src/app/services/http/like-http.service';
import { ProductsHttpService } from 'src/app/services/http/products-http.service';
import { RedirectService } from 'src/app/services/redirect/redirect.service';
import { DialogService } from 'src/app/services/toast/dialog.service';
import { AppState } from 'src/app/store/app.store';
import { AddCartItem } from 'src/app/store/cart/cart.actions';
import { selectCurrentUser } from 'src/app/store/currentUser/currentUser.selector';

@Component({
  selector: 'app-specific-product',
  templateUrl: './specific-product.component.html',
  styleUrls: ['./specific-product.component.scss'],
})
export class SpecificProductComponent implements OnInit {
  product!: Product;
  liked = 'material-icons';
  unliked = 'material-icons-outlined';
  thumbUp: boolean = false;
  thumbDown: boolean = false;
  userId!: number;

  quantityForm = new FormGroup({
    quantity: new FormControl('1', [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^0|[1-9]\d*$/),
    ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productHttp: ProductsHttpService,
    private likesHttp: LikeHttpService,
    private store: Store<AppState>,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectCurrentUser)
      .pipe(
        switchMap((user) => {
          const userId = user?.id;
          if (userId) {
            this.userId = userId;
          }
          return this.activatedRoute.paramMap.pipe(
            switchMap((params) => {
              const slug = params.get('slug');
              if (!slug) {
                return EMPTY;
              }
              return this.productHttp.getSpecificProduct(slug).pipe(
                switchMap((responseData) => {
                  const product = responseData.data;
                  if (!userId) {
                    return of({ product: product, likes: null });
                  }
                  return this.likesHttp.getLikes(product.id, userId).pipe(
                    map((res) => {
                      return { product: product, likes: res };
                    })
                  );
                })
              );
            })
          );
        })
      )
      .subscribe(({ product, likes }) => {
        this.product = product;
        if (likes && likes.data.length > 0) {
          const likeDown = likes.data[0].kind === 0;
          const likeUp = likes.data[0].kind === 1;
          if (likeUp) {
            this.thumbUp = true;
          }
          if (likeDown) {
            this.thumbDown = true;
          }
        }
      });
  }

  handleSubmit() {
    if (this.quantityForm.valid && this.quantityForm.value.quantity) {
      const { name, master, id, image } = this.product;
      const cartItem = new CartItem(
        name,
        +this.quantityForm.value.quantity,
        master.price,
        0,
        id,
        0,
        image.url
      );
      this.store.dispatch(AddCartItem({ payload: cartItem }));
    }
  }

  get quantityControl() {
    return this.quantityForm.get('quantity') as FormControl;
  }

  likeProduct(type: Kind) {
    if (!this.userId) {
      const currentPath = this.router.url;
      this.dialogService.open(currentPath);
    } else {
      const productToLike = {
        product_id: this.product.id,
        kind: type,
      };
      this.likesHttp.postLikes(productToLike).subscribe((res) => {
        type === 'up' ? (this.thumbUp = true) : (this.thumbDown = false);
      });
    }
  }
}
