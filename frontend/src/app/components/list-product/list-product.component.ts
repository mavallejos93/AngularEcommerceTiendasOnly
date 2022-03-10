import { Component, OnInit } from '@angular/core';
import {ProductService } from '../../services/product.service';
import { global } from '../../services/GLOBAL';

import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  public  product: any;
 
  public url: any;
  
  public identity:any;

  constructor( private productService: ProductService, private userService: UserService, private router : Router, ) {
    this.url = global.url;
    this.identity = userService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity.role == 'ADMIN'){
    
    this.productService.listaProduct('').subscribe(
      (response) => {
        this.product = response.product;
        console.log(this.product)
        
      },
      (error) => {
        console.log(error);
      }
    ) }else{
      this.router.navigate(['dashboard']);
    }
  }

 

  deleteProduct(id: any){
    Swal.fire({
      title: 'Esta seguro de eliminarlo?',
      text: "Eliminación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Producto eliminado!',
          'Se elimino correctamente el producto',
          'success'
        )
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals

        this.productService.deleteProduct(id).subscribe(
          response=>{
            this.productService.getProductID('').subscribe(
              response=>{
                this.product = response.product;
              }
              ,error=>{

              }
            );
          }
          ,error=>{

          }
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se cancelo la `peticion',
          'error'
        )
      }
    })
  }

  
}



