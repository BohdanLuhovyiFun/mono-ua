import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/products/products.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public basketInfoStatus = false;
 


  public basket: Array<IProductResponse> = [];
  public total = 0;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

 
  openBasketInfo(): void{
    this.basketInfoStatus=!this.basketInfoStatus;
  }

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  deleteBasketProduct(basketArray: IProductResponse) {
    console.log('deleted, it will be completed successfully after another lessons))'); 
  }


  // productCount(product: IProductResponse, value: boolean) {
  //   if(value){
  //     ++product.count;
  //   } else if(!value && product.count > 1){
  //     --product.count;
  //   }
  // }
}
