import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpService {
  baseUrl = 'https://trainee-program-api-staging.applaudostudios.com/api/v1/';
  abstract urlRest: string;

  authRouteoOtions = {
    params: {
      authRoute: true,
    },
  };

  noAuthOptions = {
    params: {
      authRoute: false,
    },
  };
}
