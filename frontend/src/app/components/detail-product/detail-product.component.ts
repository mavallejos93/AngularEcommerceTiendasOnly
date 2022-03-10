import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { global } from '../../services/GLOBAL';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  public  product: any;
 // public product : any;
  public url: any;
  //data: Product1[] ;
  public id : any;
  constructor(  private route: ActivatedRoute,  private productService: ProductService) { 
    this.url = global.url;
    
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      console.log(this.id)
      this.productService.getProductID(this.id).subscribe(
        (response) => {
          this.product = response.product;
          
        },
        (error) => {
          console.log(error);
        }
      );
    });
    
  }
  

}
