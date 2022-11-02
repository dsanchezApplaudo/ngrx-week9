import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, Observable } from 'rxjs';
import { Category } from 'src/app/models,types,interfaces/models/category.model';
import { AppState } from 'src/app/store/app.store';
import { selectCategories } from 'src/app/store/categories/categories.selectors';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  nameOpen = true;
  categoryOpen = true;
  sortOpen = true;
  sortValue = new FormControl('', []);
  categoryValue = new FormControl('', []);
  inputValue = new FormControl('', []);
  categories$!: Observable<Category[]>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories$ = this.store.select(selectCategories);

    this.route.queryParamMap.subscribe((val) => {
      const inputVal = val.get('name');
      const sortVal = val.get('sort');
      const categoryVal = val.get('category');

      this.sortValue.setValue(sortVal);
      this.inputValue.setValue(inputVal);
      this.categoryValue.setValue(categoryVal);
    });

    this.categoryValue.valueChanges.subscribe((value) => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category: value },
        queryParamsHandling: 'merge',
      });
    });

    this.sortValue.valueChanges.subscribe((value) => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { sort: value },
        queryParamsHandling: 'merge',
      });
    });

    this.inputValue.valueChanges
      .pipe(debounceTime(700))
      .subscribe((value: string | null) => {
        if (value || (value === '' && this.inputValue.touched)) {
          const paramVal = value.toLocaleLowerCase();
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { name: paramVal },
            queryParamsHandling: 'merge',
          });
        }
      });
  }
}
