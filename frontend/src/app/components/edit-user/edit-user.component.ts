import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../models/user';

import { UserService } from '../../services/user.service';
import { global } from '../../services/GLOBAL';


interface HtmlInputEvent  extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {

  public user: any;
  public id: any;
  public url: any;
  public mensajeExito: any;
  public mensajeError: any;
  public pass = "";
  public identity:any;
 

  constructor(private route: ActivatedRoute, private userService: UserService, private router : Router, ) {

    this.url = global.url;
    this.identity = userService.getIdentity();
    this.user = new User();
   }

  ngOnInit(): void {
    
    let id = this.identity._id;
    this.route.params.subscribe((params) => {
      this.id = id;
      console.log(this.id )
      this.userService.getUserID(this.id).subscribe(
        (response) => {
          this.user = response.user; 
        },
        (error) => {
          console.log(error);
        }
      );
    });
  
  }

  cerrarError() {
    setTimeout(() => {
      this.mensajeExito = "";
      this.mensajeError = "";
    }, 2000);
  }

  ediUser(userForm: any) {
    // validamos que el formulario tenga los campos requeridos
    if (userForm.valid) {
      // enviamos los datos del formulario al metodo registrar curso
      this.userService
        .editUser({
          _id: this.id,
          names: userForm.value.names,
          lastName: userForm.value.lastName,
          age: userForm.value.age,
          email: userForm.value.email,
          pass: userForm.value.pass,
          role: userForm.value.role,
          address: userForm.value.address,
          phoneNumber: userForm.value.phoneNumber,
          getToken: true,
          
        })
        .subscribe(
          (response) => {
            // mensaje de exito
            this.mensajeExito = " se actualizo el usuario correctamente producto ";
            console.log(response);
            //limpiamos todos los datos para que el formulario se limpie 
            //this.user = new User("","","",0,"","","","","",true);
            
            // limpiamos el mensaje
            this.cerrarError();
          },
            (error) => {
            // mensaje de error
            this.mensajeError = "Error al editar producto";
            console.log("Error ", error);
            //limpiamos todos los datos para que el formulario se limpie 
            this.user = new User();
             
            // limpiamos el mensaje
            this.cerrarError();
          }
        );
    } else {
      // en caso tal que los datos del formulario no se envien o falten datos
      this.mensajeError = "Datos incompletos";
      console.log("Favor llenar todos los datos");
      this.cerrarError();
      console.log("error en datos");
    }
  }

}
