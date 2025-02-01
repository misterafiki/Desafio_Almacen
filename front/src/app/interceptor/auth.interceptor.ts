import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const param = req.params.get('auth');
  if (param) {
    const token = localStorage.getItem('authToken');
    const peticion = req.clone({
      headers: req.headers.set('x-token', token || ''),
    });
    return next(peticion);
  }
  return next(req);
};
