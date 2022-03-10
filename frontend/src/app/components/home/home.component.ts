import { Component, OnInit } from '@angular/core';
import {ProductService } from '../../services/product.service';
import { global } from '../../services/GLOBAL';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public  product: any;
 
  public url: any;
  

  constructor( private productService: ProductService) { 
    this.url = global.url;
  }

  ngOnInit(): void {
    this.productService.listaProduct('').subscribe(
      (response) => {
        this.product = response.product;
        console.log(this.product)
        
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
