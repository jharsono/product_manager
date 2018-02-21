import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }
  editProduct: any;

    getAllProducts(){
     // our http response is an Observable, store it in a variable
     // let tempObservable = this._http.get('/tasks');
     // // subscribe to the Observable and provide the code we would like to do with our data from the response
     // tempObservable.subscribe(data => console.log("Got our tasks!", data));
     return this._http.get('/show-all');
   }

   new(product) {
     return this._http.post('/new', product);
   }

   getProduct(id){
     console.log("service id:", id);
     console.log("now in the service");
     this.editProduct = id;

     console.log("product:", this.editProduct)

   }

   returnProduct(){
     return this._http.get(`/products/${this.editProduct}`);
   }

   update(product){
     console.log("about to edit: ", this.editProduct)
     return this._http.put(`/update/${this.editProduct}`, product);
   }

   delete(id) {
     console.log("about to delete product:", id);
     return this._http.delete(`/delete/${id}`);
   }
}
