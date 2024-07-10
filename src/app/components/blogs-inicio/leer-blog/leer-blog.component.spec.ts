import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerBlogComponent } from './leer-blog.component';

describe('LeerBlogComponent', () => {
  let component: LeerBlogComponent;
  let fixture: ComponentFixture<LeerBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeerBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeerBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
