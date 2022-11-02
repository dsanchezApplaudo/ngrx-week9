import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.store';
import { FetchCategoriesStart } from './store/categories/categories.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Diego Store';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(FetchCategoriesStart());
  }
}
