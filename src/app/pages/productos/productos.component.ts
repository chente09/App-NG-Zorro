import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  dataProductos = [
    {
      nombre: 'Producto 1',
      valor: 100,
      descuento: 0.10,
      imagen: 'ruta/a/imagen1.jpg'
    },
    {
      nombre: 'Producto 2',
      valor: 150,
      descuento: 0.20,
      imagen: 'ruta/a/imagen2.jpg'
    },
    {
      nombre: 'Producto 3',
      valor: 200,
      descuento: 0.00,
      imagen: 'ruta/a/imagen3.jpg'
    }
    // Añade más productos según sea necesario
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
