import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SharedModule } from './modules/shared/shared.module';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppState, storeReducer } from './store/app.store';
import { AuthEffects } from './store/currentUser/currentUser.effects';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from 'src/environments/environment';
import { ProductsEffects } from './store/products/products.effects';
import { localStorageSyncReducer } from './store/metaReducers/localStorage.metaReducer';
import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { HomeModule } from './modules/home/home.module';
import { ProductsModule } from './modules/products/products.module';
import { SpecificProductModule } from './modules/specific-product/specific-product.module';
import { CategoriesEffects } from './store/categories/categories.effects';

export function logger(reducer: ActionReducer<AppState>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = environment.production
  ? [localStorageSyncReducer]
  : [logger, localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // UserDropdownComponent,
    // CartComponent,
    // CartItemComponent,
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    CategoryModule,
    CheckoutModule,
    EffectsModule.forRoot([AuthEffects, ProductsEffects, CategoriesEffects]),
    HomeModule,
    HttpClientModule,
    ProductsModule,
    SharedModule,
    SpecificProductModule,
    StoreModule.forRoot(storeReducer, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
