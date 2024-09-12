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
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  producto: Producto[] = [];
  form: FormGroup;
  showForm: boolean = false; // Para controlar si mostrar o no el formulario
  isEditing: boolean = false; // Controla si estamos en modo edición
  selectedProduct: Producto | null = null; // Producto seleccionado para editar

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

  // Mostrar el formulario para agregar un nuevo producto
  showAddForm(): void {
    this.showForm = true;
    this.isEditing = false; // Estamos en modo agregar, no edición
    this.form.reset(); // Limpiar el formulario
  }

  // Método para agregar un producto
  addProducto(): void {
    if (this.form.invalid) return;
    this.productService.createProducto(this.form.value)
      .then((producto) => {
        this.producto.push(producto);
        this.form.reset();
        this.showForm = false; // Ocultar el formulario después de agregar el producto
      })
      .catch(error => console.log(error));
  }

  getProductos(): void {
    this.productService.getProducto().subscribe(ps => this.producto = ps);
  }

  // Método para eliminar un producto
  deleteProducto(producto: Producto): void {
    this.productService.deleteProducto(producto)
      .then(() => {
        this.producto = this.producto.filter(p => p.id !== producto.id);
      })
      .catch(error => console.log(error));
    this.form.reset();
  }

  // Método para editar un producto
  editProducto(producto: Producto): void {
    this.showForm = true; // Mostrar el formulario
    this.isEditing = true; // Activar modo edición
    this.selectedProduct = producto; // Almacenar el producto que estamos editando

    // Rellenar el formulario con los datos del producto
    this.form.patchValue({
      nombre: producto.nombre,
      marca: producto.marca,
      imagen: producto.imagen,
      precio: producto.precio,
      descripcion: producto.descripcion,
    });
  }

  // Método para actualizar un producto
  updateProducto(): void {
    if (!this.form.valid || !this.selectedProduct) return;
    const updatedProducto = { ...this.selectedProduct, ...this.form.value }; // Combinar el producto editado con los nuevos valores

    this.productService.updateProducto(updatedProducto)
      .then(() => {
        const index = this.producto.findIndex(p => p.id === this.selectedProduct!.id);
        this.producto[index] = updatedProducto;
        this.isEditing = false; // Salir del modo edición
        this.form.reset();
        this.showForm = false; // Ocultar el formulario después de actualizar
      })
      .catch(error => console.log(error));
  }

  // Método para cancelar la edición
  cancelEdit(): void {
    this.isEditing = false; // Salir del modo edición
    this.showForm = false; // Ocultar el formulario
    this.form.reset(); // Limpiar el formulario
  }
}
