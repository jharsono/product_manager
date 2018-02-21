import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products={}; //placeholder to store the products
  deleteProduct: any;
  constructor(private _httpService: HttpService){ }
  ngOnInit(){
    this.getProductsFromService();
    }
  getProductsFromService(){ // define the function to get an observable and subscribe
    let observable = this._httpService.getAllProducts(); //getAllProducts is invoked from http.service
    observable.subscribe(data => {
        console.log("Got our data!", data);
        this.products = data; //put data into products objects
      }); // subscribe
    }
    getProduct(id) {
      console.log(id);
      this._httpService.getProduct(id); //getProduct is invoked from http.service
      }

    delete(id){
      let observable = this._httpService.delete(id);
      observable.subscribe( data => {
        this.getProductsFromService();
      });
    }
  }
