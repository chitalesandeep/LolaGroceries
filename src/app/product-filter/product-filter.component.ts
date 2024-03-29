import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('category') category;

  constructor(private categorysrv:CategoryService) {
    this.categories$ = categorysrv.getCategories();
   }

  ngOnInit() {
  }

}
