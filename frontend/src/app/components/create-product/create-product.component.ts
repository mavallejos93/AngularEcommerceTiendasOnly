import { Component, OnInit   } from '@angular/core';
import { Product } from '../../models/product';

import {ProductService } from '../../services/product.service';
import { global } from '../../services/GLOBAL';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';



interface HtmlInputEvent  extends Event {
  target: HTMLInputElement & EventTarget;
}
     
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public mensajeError : any;
  public file: any;
  // variable para la imagen seleccionada
  public selecionarImg: any;
// variable para cargar las categorias
  public categoria : any;
  // variable para mensajes exitosos
  public mensajeExito: any;

  public  product: any;
 
  public url: any;
  public identity: any;

  constructor( private route: ActivatedRoute, private userService: UserService, private productService: ProductService, private router : Router,  ) {
    this.url = global.url;
    this.identity = userService.getIdentity();
    this.product = new Product();
   }

   ngOnInit():void {
    if(this.identity.role == 'ADMIN'){

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

        

  creaProduct(productForm: any) {
    // validamos que el formulario tenga los campos requeridos
    if (productForm.valid) {
      // enviamos los datos del formulario al metodo registrar curso
      this.productService
        .createProduct({
          name: productForm.value.name,
          description: productForm.value.description,
          image: this.file, // imagen seleccionada
          cost: productForm.value.cost,
          price: productForm.value.price,
          color: productForm.value.color,
          idcategory: productForm.value.idcategory,
          type: productForm.value.type,
          stock: productForm.value.stock,

          
        })
        .subscribe(
          (response) => {
            // mensaje de exito
            this.mensajeExito = "producto creado";
            console.log(response);
            //limpiamos todos los datos para que el formulario se limpie 
            this.product = new Product("","","","",0,0,"","","",0);
            // limpiamos el mensaje
            this.cerrarError();
          },
            (error) => {
            // mensaje de error
            this.mensajeError = "Error al crear producto";
            console.log("Error ", error);
            //limpiamos todos los datos para que el formulario se limpie 
            this.product = new Product("","","","",0,0,"","","",0);
            this.selecionarImg = ""; 
 
            // limpiamos el mensaje
            this.cerrarError();
          }
        );
    } else {
      // en caso tal que los datos del formulario no se envien o falten datos
      this.mensajeError = "Favor llenar todos los datos";
      console.log("Favor llenar todos los datos");
      /* this.product = new Product("","","","",0,0,"","","",0);
      this.selecionarImg = ""; */
 
      this.cerrarError();
      console.log("error en datos");
    }
  }


  subirImg( event: any ){
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

  cerrarError(){
    setTimeout(() => {
     this.mensajeError = '';
     this.mensajeExito = '';
    }, 2000);
  }

}
