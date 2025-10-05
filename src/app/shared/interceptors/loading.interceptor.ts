import { HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerElmnt = document.querySelector('.spinner-container') as HTMLDivElement;
  spinnerElmnt.style.display = 'flex';
  return next(req).pipe(
    delay(3000),
    finalize(() => {
      spinnerElmnt.style.display = 'none';
    })
  );
};
