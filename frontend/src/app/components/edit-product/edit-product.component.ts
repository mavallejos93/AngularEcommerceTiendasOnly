import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../models/product';

import {ProductService } from '../../services/product.service';
import { global } from '../../services/GLOBAL';
import { UserService } from 'src/app/services/user.service';

interface HtmlInputEvent  extends Event {
  target: HTMLInputElement & EventTarget;
}
     



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

   // variables
   public product: any;
   public id: any;
   public categoria: any;
   public url: any;
   public file: any;
   public selecionarImg: any;
   public mensajeExito: any;
   public mensajeError: any;
   public imgSelect:any;
   public identity:any;
  // public stock: any;

  constructor( private route: ActivatedRoute,private userService: UserService, private productService: ProductService, private router : Router, ) { 
               
        this.url = global.url;
        this.identity = userService.getIdentity();
        this.product = new Product();
    }

  ngOnInit(): void {
    if(this.identity.role == 'ADMIN'){
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
    this.productService.getCategory().subscribe(
      ( response)=>{
         this.categoria = response.category;
         console.log(this.categoria);
       },
       (error)=>{
         console.log(error);
       }
     );}
     else{
      this.router.navigate(['dashboard']);
    }
  }

  // Metodo para seleccionar la imagen a subir
  subirImg(event: any) {
    // Validamos si se cargo alguna imagen
    if (event.target.files && event.target.files[0]) {
      // en nuestra variable publica file obtenemos la imagen que llego desde el evento de la pagina
      this.file = <File>event.target.files[0];
      // creamos una variable de lectura para ver la imagen seleccionada
      const leer = new FileReader();
      // cargamos la imagen seleccionada y guardamos lo que haya en resultado
      leer.onload = (img) => (this.selecionarImg = leer.result);
      // leemos y mostramos la imagen
      leer.readAsDataURL(this.file);
    }
  }

  

  cerrarError() {
    setTimeout(() => {
      this.mensajeExito = "";
      this.mensajeError = "";
    }, 2000);
  }

  ediProduct(productForm: any) {
    // validamos que el formulario tenga los campos requeridos
    if (productForm.valid && this.file) {
      // enviamos los datos del formulario al metodo registrar curso
      this.productService
        .editProduct({
          _id: this.id,
          name: productForm.value.name,
          description: productForm.value.description,
          image: this.file, // imagen seleccionada
          cost: productForm.value.cost,
          price: productForm.value.price,
          color: productForm.value.color,
          idcategory: productForm.value.idcategory,
          type: productForm.value.type,
          stock: productForm.value.stock,
          selecionarImg: this.product.imagen,
          
        })
        .subscribe(
          (response) => {
            // mensaje de exito
            this.mensajeExito = " se actualizo el producto correctamente producto ";
            console.log(response);
            //limpiamos todos los datos para que el formulario se limpie 
            this.product = new Product();
            this.selecionarImg = "";
            // limpiamos el mensaje
            this.cerrarError();
          },
            (error) => {
            // mensaje de error
            this.mensajeError = "Error al editar producto";
            console.log("Error ", error);
            //limpiamos todos los datos para que el formulario se limpie 
            this.product = new Product();
            this.selecionarImg = "";
 
            // limpiamos el mensaje
            this.cerrarError();
          }
        );
    } else {
      // en caso tal que los datos del formulario no se envien o falten datos
      this.mensajeError = "Datos incompletos o imagen no cargada";
      console.log("Favor llenar todos los datos");
      this.cerrarError();
      console.log("error en datos");
    }
  }

  

}
      
 
          
         

  



