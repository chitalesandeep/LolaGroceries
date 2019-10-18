import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { ProductService } from "../../product-service.service";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { Product } from "../../product";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {

  productsList:Product[];
  filteredList:any[];
  subscribtion:Subscription;
  //tableResource:DataTableResource<Product>;

  displayedColumns: string[] = ['Title', 'Price', 'Action'];
  dataSource:MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private rout:Router,
    private productService:ProductService) { 

    this.subscribtion = this.productService.getAll('/products')
      .subscribe(res => {this.filteredList = this.productsList = res;
        this.dataSource = new MatTableDataSource(this.filteredList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
      this.subscribtion.unsubscribe();
  }

  delete(id) {
    if(!confirm("are you sure to delete this?")) return;

    this.productService.deleteVal(id,'/products/');
  }

  filterme(inp: string) {
    this.filteredList = (inp) ? this.productsList.filter( e => e.title.toLowerCase().includes(inp.toLowerCase() )):
    this.productsList;

    this.dataSource = new MatTableDataSource(this.filteredList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
