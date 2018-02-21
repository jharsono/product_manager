import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newProduct = {title: "", price: "", imageUrl: ""}; // bind new product
  constructor(private _httpService: HttpService, private router: Router){ }

  ngOnInit() {
    this.newProduct = {title: "", price: "", imageUrl: ""}; //reset the product
  }
  addProduct(){
    console.log(this.newProduct);
    let observable = this._httpService.new(this.newProduct); //pass the newTask into service
    observable.subscribe(product => {
      console.log("adding a product", product);
      // this.newProduct = {title: "", price: "", imageUrl: ""}; //reset the product
      this.router.navigate(['products']);

    })
  }
}
