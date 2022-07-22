import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/products/products.interface';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userProducts: Array<IProductResponse> = [];

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.userProducts = data;
    });
  }


  public counter = 1;

  countMax(): void {
    this.counter++
  }

  countMin(): void {
    // if(this.counter <=1){
    //   alert('Не можна купити менше одного товару.')
    // }
    // else{
    //   this.counter=this.counter-1
    // }
    this.counter=this.counter-1
  }

}
