import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: any
  constructor(private _httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.showProduct();
    this.product = {title:"", description:"", imageUrl: "" };

  }
  showProduct() {
    let observable = this._httpService.returnProduct(); //getProducts is invoked from http.service
    observable.subscribe(data => {
        console.log("Got our data!", data);
        this.product = data; //put data into products objects
        console.log("this product: ", this.product);
      }); // subscribe
    }
    update(){
      console.log("NEW PRODUCT INFO:", this.product);
      let observable = this._httpService.update(this.product);
      observable.subscribe(product => {
        console.log("editing product", product);
        //go to another route?
        this.router.navigate(['/products']);
      })
    }

}
