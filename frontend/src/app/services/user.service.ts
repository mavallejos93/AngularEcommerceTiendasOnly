import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './GLOBAL';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url;
  public data:any;
  public user: any;
   // creamos variables token e identity
   public token: any;
   public identity:any;

  constructor(private http: HttpClient) { 
    this.url = global.url;
    // Inicializamos el modelo uusuario
    this.user = new User();
  }

  registerUser(data:any):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(this.url + 'user/registerUser',data,{headers:headers});
  }

  getUser(filtro:any):Observable<any>{

      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      if(filtro !== ''){
        return this.http.post(this.url  +'user/' + filtro, {headers: headers});
      }else{
        return this.http.get(this.url  +'user/' + filtro, {headers: headers});
      }
    }

  getUserID(id: any): Observable<any> {
      // Headers del request
      let headers = new HttpHeaders().set("Content-Type", "application/json");
      return this.http.get(this.url + "user/" + id, {
        headers: headers,
      });
    }

    editUser(data:any):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.put(this.url + 'user/editUser/'+data._id,data,{headers:headers});
    }

    deleteUser(id:any):Observable<any>{
      // Headers del request
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      // consumimos la API
      return this.http.delete(this.url + 'user/deleteUser/' + id ,{ headers: headers });
    }

// login y identity

     // Metodo para hacer login
  login(user: User, getToken: boolean): Observable<any> {
    // Variable que almacene los datos del usuario
    let json = user;
    // Validamos si llego un token
    if (!getToken) {
    } else {
      user.getToken = true;
    }
    // Headers del request
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // enviamos y recibimos la peticion
    // http://localhost:3001/api/login
    return this.http.post(this.url + 'login', json, { headers: headers });
  }

  // Metodo para obtener el token
  getToken(): Observable<any> {
    let token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    } else {
      this.token = false;
    }
    return this.token;
  }

  // Metodo para los datos del usuario
  getIdentity():Observable<any>{
    let identity = JSON.parse(localStorage.getItem('identity') || '{}');
    /* this.identity = JSON.parse(localStorage.getItem('identity') || '{}'); */

    if(identity){
      this.identity = identity;
    }else{
      this.identity = false;
    }

    return this.identity;
  }

}