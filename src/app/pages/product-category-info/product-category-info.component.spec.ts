import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryInfoComponent } from './product-category-info.component';

describe('ProductCategoryInfoComponent', () => {
  let component: ProductCategoryInfoComponent;
  let fixture: ComponentFixture<ProductCategoryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
