import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoAccesoComponent } from './codigo-acceso.component';

describe('CodigoAccesoComponent', () => {
  let component: CodigoAccesoComponent;
  let fixture: ComponentFixture<CodigoAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodigoAccesoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodigoAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
