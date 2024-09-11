import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProductsService, Product } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-employee',
  standalone: true,
  imports: [CommonModule, NzTableModule],
  templateUrl: './products-employee.component.html',
  styleUrl: './products-employee.component.css'
})
export class ProductsEmployeeComponent {
  product: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.productsService.getProducts().subscribe(ps=>this.product=ps);
  }
}
