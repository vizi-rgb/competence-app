import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authWithRedirectGuard } from './auth-with-redirect.guard';

describe('authWithRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authWithRedirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
