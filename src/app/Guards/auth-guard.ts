import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = Date.now() > payload.exp * 1000;

    if (isExpired) {
      localStorage.removeItem('token');
      router.navigate(['/login']);
      return false;
    }

    return true;
  } catch (e) {
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }
};
