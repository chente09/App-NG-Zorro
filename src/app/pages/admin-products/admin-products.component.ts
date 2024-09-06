import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProductService, Producto } from '../../services/productos/productos.service';
import { Router, RouterLink } from '@angular/router';	
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [NzTableModule, RouterLink, NzUploadModule, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {
  producto: Producto[] = [];

  form: FormGroup;

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      imagen: [''],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {  
    this.getProductos();
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

  getProductos(): void{
    this.productService.getProducto().subscribe(ps=>this.producto=ps);
  }

  
  loadProducts(): void {
    this.productService.getProducto().subscribe(data => {
      this.producto = data;
    });
  }


  deleteProducto(producto: Producto): void {
    this.productService.deleteProducto(producto)
      .then(() => {
        this.producto = this.producto.filter(p => p.id !== producto.id);
      })
      .catch(error => console.log(error));
  }

 
  editProducto(producto: Producto): void {

    

    this.form.patchValue({
      nombre: producto.nombre,
      marca: producto.marca,
      url: producto.photoURL,
      precio: producto.precio,
      descripcion: producto.descripcion,
    });


    
  
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
}
