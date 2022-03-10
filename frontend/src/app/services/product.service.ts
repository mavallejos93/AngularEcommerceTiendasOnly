import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { global } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  public url: any;

  constructor(private http: HttpClient) { 

    this.url = global.url;

  }

    listaProduct(filtro: any): Observable<any>{

      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      if(filtro !== ''){
        return this.http.post(this.url  +'product/' + filtro, {headers: headers});
      }else{
        return this.http.get(this.url  +'product/' + filtro, {headers: headers});
      }
    } 

    createProduct(data: any ): Observable<any>{
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("cost", data.cost);
    formData.append("price", data.price);
    formData.append("color", data.color);
    formData.append("idcategory", data.idcategory);
    formData.append("type", data.type);
    formData.append("stock", data.stock);
    
 
    return this.http.post(this.url + "product/registrarProduct", formData);
  }

  editProduct(data: any) {
    const formData = new FormData();
    console.log(data);
 
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("cost", data.cost);
    formData.append("price", data.price);
    formData.append("color", data.color);
    formData.append("idcategory", data.idcategory);
    formData.append("type", data.type);
    formData.append("stock", data.stock);
    
 
    return this.http.put(this.url + "product/editarProduct/" + data._id, formData);
  }

  getProductID(id: any): Observable<any> {
    // Headers del request
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + "product/" + id, {
      headers: headers,
    });
  }

  
 deleteProduct(id:any):Observable<any>{
  // Headers del request
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  // consumimos la API
  return this.http.delete(this.url + 'product/eliminarProduct/' + id ,{ headers: headers });
}
  
  getCategory():Observable<any>{
    // Headers del request
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // consumimos la API
    return this.http.get(this.url + 'category/', { headers: headers });
 }

 registerCategory():Observable<any>{
  // Headers del request
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  // consumimos la API
  return this.http.get(this.url + 'category/registrarCategory/', { headers: headers });
}


 
}
