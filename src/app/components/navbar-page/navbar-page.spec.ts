import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPage } from './navbar-page';

describe('NavbarPage', () => {
  let component: NavbarPage;
  let fixture: ComponentFixture<NavbarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
