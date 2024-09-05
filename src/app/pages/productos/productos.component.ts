import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products: any[] = []; 

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  deleteProduct(id: number): void {
    if (confirm("¿Está seguro de que desea eliminar este producto?")) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts(); 
      });
    }
  }

  updateProduct(id: number): void {
    const product = this.products.find(p => p.id === id);
    if (product) {
      
      product.precio += 1;
      this.productService.updateProduct(product).subscribe(() => {
        this.loadProducts(); 
      });
    }
  }

  addToCart(id: number): void {
    alert(`Producto ${id} agregado al carrito`);
  }

  addProduct(): void {
    const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
    const newProduct = {
      id: newId,
      nombre: `Nuevo Producto ${newId}`,
      descripcion: 'Nueva descripción',
      categoria: 'Nueva Categoría',
      imagen: '/assets/placeholder.png',
      precio: 0.00
    };
    this.productService.addProduct(newProduct).subscribe(() => {
      this.loadProducts(); 
    });
  }
}
