import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProductService, Producto } from '../../services/productos/productos.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [NzTableModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {
  productos: Producto[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {  
    this.getProductos();
  }

  getProductos(): void{
    this.productService.getProducto().subscribe(ps=>this.productos=ps);
  }

  
  loadProducts(): void {
    this.productService.getProducto().subscribe(data => {
      this.productos = data;
    });
  }

  addToCart(id: number): void {
    alert(`Producto ${id} agregado al carrito`);
  }

  

}
