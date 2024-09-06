import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Producto {
  id: string;
  nombre: string;
  marca: string;
  photoURL: string;
  precio: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  currentProduct?: Producto;
  
  constructor(private firestore: Firestore) { }

  getProducto(): Observable<Producto[]> {
    const productoRef = collection(this.firestore, 'productos');
    return collectionData(productoRef, { idField: 'id' });
  }

  createProducto(producto: Producto): Promise<any> {
    const productoRef = collection(this.firestore, 'productos');
    return addDoc(productoRef, producto);
  }

  updateProducto(producto: Producto): Promise<any> {
    const docRef = doc(this.firestore, `productos/${producto.id}`);
    return updateDoc(docRef, { ...producto });
  }

  deleteProducto(producto: Producto): Promise<any> {
    const docRef = doc(this.firestore, `productos/${producto.id}`);
    return deleteDoc(docRef);
  }

}