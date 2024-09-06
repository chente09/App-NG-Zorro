import { Component } from '@angular/core';
import * as productoData from '../../../../public/json/productoData.json';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService, Producto } from '../../services/productos/productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos: Producto[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {  
    this.getProductos();
  }

  getProductos(): void{
    this.productService.getProducto().subscribe(ps=>this.productos=ps);
  }
}
