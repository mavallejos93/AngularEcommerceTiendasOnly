import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/user';
import { global } from '../../../services/GLOBAL';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public mensajeError : any;
  public mensajeExito: any;
  public user: any;
  public url: any;

  constructor(private registerService: UserService) {
    
    this.url = global.url;
    this.user = new User();
  }

  ngOnInit(): void {  }


  registerUser(userForm: any) {
    // validamos que el formulario tenga los campos requeridos
    if (userForm.valid) {
      // enviamos los datos del formulario al metodo registrar curso
      this.registerService
        .registerUser({

          names: userForm.value.names,
          lastName: userForm.value.lastName,
          age: userForm.value.age,
          email: userForm.value.email,
          pass: userForm.value.pass,
          role: "USER",
          address: userForm.value.address,
          phoneNumber: userForm.value.phoneNumber,

        })
        .subscribe(
          (response) => {
            // mensaje de exito
            this.mensajeExito = "usuario creado";
            console.log(response);
            //limpiamos todos los datos para que el formulario se limpie 
            this.user = new User();
            // limpiamos el mensaje
            this.cerrarError();
          },
            (error) => {
            // mensaje de error
            this.mensajeError = "Error al crear producto";
            console.log("Error ", error);
            //limpiamos todos los datos para que el formulario se limpie 
            this.user = new User();
            
            // limpiamos el mensaje
            this.cerrarError();
          }
        );
    } else {
      // en caso tal que los datos del formulario no se envien o falten datos
      this.mensajeError = "Favor llenar todos los datos";
      console.log("Favor llenar todos los datos");
       
      this.cerrarError();
      console.log("error en datos");
    }
  }

  cerrarError(){
    setTimeout(() => {
     this.mensajeError = '';
     this.mensajeExito = '';
    }, 2000);
  }

}
