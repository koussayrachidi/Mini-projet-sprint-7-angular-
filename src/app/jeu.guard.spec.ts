import { TestBed } from '@angular/core/testing';

import { JeuGuard } from './jeu.guard';

describe('JeuGuard', () => {
  let guard: JeuGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JeuGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
