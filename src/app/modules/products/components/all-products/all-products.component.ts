import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models,types,interfaces/models/product.model';
import { AppState } from 'src/app/store/app.store';
import { FetchProductsStart } from 'src/app/store/products/products.actions';
import {
  selectProducts,
  selectProductsLoading,
} from 'src/app/store/products/products.selectors';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products$!: Observable<Product[]>;
  productsLoading$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsLoading$ = this.store.select(selectProductsLoading);
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const page = params.get('page');
      if (!page) {
        this.router.navigate([], { queryParams: { page: 1 } });
      }
      this.store.dispatch(FetchProductsStart({ payload: params }));
    });

    this.products$ = this.store.select(selectProducts);
  }
}
