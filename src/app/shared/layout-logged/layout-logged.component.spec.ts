import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLoggedComponent } from './layout-logged.component';

describe('LayoutLoggedComponent', () => {
  let component: LayoutLoggedComponent;
  let fixture: ComponentFixture<LayoutLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutLoggedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
