import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';

export type ParamsIndex = {
  [key: string]: string;
};

type ParamKey = keyof ParamsIndex & string;

@Injectable({
  providedIn: 'root',
})
export class HttpUtils {
  paramsIndex: ParamsIndex = {
    page: '&[page][number]=',
    category: '&[filter][category_slug_eq]=',
    name: '&[filter][name_cont]=',
    sort: '&sort=name ',
  };

  getParams(allParams: ParamMap) {
    let result = '';
    allParams.keys.forEach((paramKey: ParamKey) => {
      const param = allParams.get(paramKey);
      if (param !== '') {
        result += (this.paramsIndex[paramKey] + param) as string;
      }
    });

    return result;
  }
}
