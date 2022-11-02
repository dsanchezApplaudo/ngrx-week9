import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IMeta } from 'src/app/models,types,interfaces/interfaces/meta.interface';
import { Category } from 'src/app/models,types,interfaces/models/category.model';
import { Product } from 'src/app/models,types,interfaces/models/product.model';
import { AppState } from 'src/app/store/app.store';
import { selectCategories } from 'src/app/store/categories/categories.selectors';
import {
  selectProducts,
  selectProductsLoading,
  selectProductsMeta,
} from 'src/app/store/products/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  categories$!: Observable<Category[]>;
  isLoading$!: Observable<boolean>;
  products$!: Observable<Product[]>;
  meta$!: Observable<IMeta>;
  productsLength$!: Observable<number>;
  productsSize: number = 12;
  currentPage: number = 1;
  pagination: boolean = false;
  filterOpened: boolean = false;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories$ = this.store.select(selectCategories).pipe(
      map((categories) => {
        return categories.slice(0, 5);
      })
    );
    this.isLoading$ = this.store.select(selectProductsLoading);
    this.products$ = this.store.select(selectProducts);
    this.productsLength$ = this.store.select(selectProductsMeta).pipe(
      map((value) => {
        if (value) {
          return value.total;
        }
        return 0;
      })
    );
    this.route.queryParamMap.subscribe((params) => {
      const page = params.get('page');
      if (page) {
        this.currentPage = +page - 1;
        this.pagination = true;
      } else {
        this.pagination = false;
      }
    });
  }

  tagClick(name: string) {
    this.router.navigate(['/products'], {
      queryParams: { page: 1, categorySlug: name },
    });
  }

  eventClick(event: PageEvent) {
    this.router.navigate([], {
      queryParams: { page: event.pageIndex + 1 },
      queryParamsHandling: 'merge',
    });
  }

  toggleFilter() {
    this.filterOpened = !this.filterOpened;
  }
}
