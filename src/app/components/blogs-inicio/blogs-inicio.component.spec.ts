import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsInicioComponent } from './blogs-inicio.component';

describe('BlogsInicioComponent', () => {
  let component: BlogsInicioComponent;
  let fixture: ComponentFixture<BlogsInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
