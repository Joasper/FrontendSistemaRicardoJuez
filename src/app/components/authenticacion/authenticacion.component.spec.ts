import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticacionComponent } from './authenticacion.component';

describe('AuthenticacionComponent', () => {
  let component: AuthenticacionComponent;
  let fixture: ComponentFixture<AuthenticacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
