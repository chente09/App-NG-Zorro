import { Component } from '@angular/core';
import { Producto } from '../../utils/producto';
import * as productoData from '../../../../public/json/productoData.json';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos: Producto[] = (productoData as any).default;

}
