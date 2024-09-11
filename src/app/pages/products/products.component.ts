import { Component } from '@angular/core';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { ProductsService, Product } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { NzTableComponent } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NzIconModule, 
    NzFormModule, 
    NzInputModule, 
    NzButtonModule, 
    ReactiveFormsModule, 
    NzCheckboxModule, 
    NzSelectModule,
    CommonModule,
    NzTableComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  form: FormGroup;
  product: Product[] = [];

  constructor(private productsService: ProductsService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.productsService.getProducts().subscribe(ps=>this.product=ps);
  }

  onClickSubmit(): void {
    if (this.form.invalid) return;
    this.productsService.createProduct(this.form.value)
      .subscribe(product => this.product.push(product));
  }

  onClickUpdate(id: string): void {
    if (this.form.invalid) return;
    this.productsService.updateProduct({id, ...this.form.value})
      .subscribe(product => {
        const index = this.product.findIndex(p => p.id === product.id);
        this.product[index] = product;
      });
  }

  onClickDelete(id: string): void { 
    this.productsService.deleteProduct(id)
    .subscribe(()=>this.product = this.product.filter(p => p.id !== id));
  }
}
