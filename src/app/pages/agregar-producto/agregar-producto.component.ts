import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService, Producto } from '../../services/productos/productos.service';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzUploadModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {
  form: FormGroup;

  producto: Producto[] = [];

  constructor(private productService: ProductService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      imagen: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.productService.getProducto().subscribe((producto) => {
      this.producto = producto;
    });
  }

  addProducto(): void {
    if (this.form.invalid) return;
    this.productService.createProducto(this.form.value)
      .then((producto) => {
        console.log(producto.id);
        this.producto.push(producto);
        this.form.reset();
      })
      .catch(error => console.log(error));
  }

  updateProducto(producto: Producto): void {
    if (!this.form.valid) return;
    const newProducto = { ...producto, ...this.form.value };
    this.productService.updateProducto(newProducto)
      .then(() => {
        const index = this.producto.findIndex(p => p.id === producto.id);
        this.producto[index] = newProducto;
      })
      .catch(error => console.log(error));
  }

  

  deleteProducto(producto: Producto): void {
    this.productService.deleteProducto(producto)
      .then(() => {
        this.producto = this.producto.filter(p => p.id !== producto.id);
      })
      .catch(error => console.log(error));
  }

  

}
