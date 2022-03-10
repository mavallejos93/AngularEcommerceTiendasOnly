import { Component,  OnInit   } from '@angular/core';

import {ProductService } from '../../services/product.service';
import { global } from '../../services/GLOBAL';


@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {


  //@Input() product : any;

 public  product: any;
 // public product : any;
  public url: any;
  //data: Product1[] ;
  

  constructor( private productService: ProductService ) { 
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
