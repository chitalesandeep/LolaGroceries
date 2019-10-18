import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../category.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductService } from '../../product-service.service';
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/take";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm:FormGroup;
  submitted:boolean = false;
  categoryList$;
  product = {};
  id;

  constructor(
      private rout:Router,
      private router:ActivatedRoute,
      private fb:FormBuilder,
      private prodService: ProductService,
      private categoryService:CategoryService) {

    this.categoryList$ = this.categoryService.getCategories();
        
        this.productForm = this.fb.group({
            title:['',Validators.required],
            category:['',Validators.required],
            price:['',[Validators.required,Validators.minLength(1)]],
            image:['']
        });

        this.id = this.router.snapshot.paramMap.get('id');

        if( this.id ) this.prodService.getInfo('/products/',this.id).take(1).subscribe( res => this.product = res);
   }

  ngOnInit() {
  }

 // get f() { return this.productForm.controls; }

   get title() {
    return this.productForm.get('title');
  }

  get price() {
    return this.productForm.get('price');
  }

  get category() {
    return this.productForm.get('category');
  }

  get image() {
    return this.productForm.get('image');
  } 

  saveProduct() {
    
    this.submitted = true;

    if(this.productForm.valid) {

      this.product = this.productForm.value;

      if(this.id) this.prodService.updateVal(this.id,'/products/',this.product);
      //console.log(this.productForm.value);
      else this.prodService.createVal('/products',this.product);
    // this.productForm.reset;
     this.rout.navigate(['/admin/products']);
    }
  }

  delete() {
    if(!confirm("are you sure to delete this?")) return;

    this.prodService.deleteVal(this.id,'/products/');
    this.rout.navigate(['/admin/products']);
  }
}
